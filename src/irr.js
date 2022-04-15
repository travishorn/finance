// --------------------------------------------------------------------
// This function calculates the Internal Rate of Return (IRR) of a
// series of regular cash flows.  Negative values represent
// investments, and positive values represent returns.
//
// ## Math:
//
// Essentially, the algorithm uses the secant method to find a rate
// where the net present value is equal to 0, stepping through the
// calculations iteratively.  Once the rate is within the Epsilon
// tolerance, the approximate rate is returned.
//
// Returns either a number or error message (as string).
// --------------------------------------------------------------------
//

import internalPv from "./internalPv.js";

export default (values, guess) => {
  guess = typeof guess === "undefined" ? 0.1 : guess;

  var epslMax = 0.0000001;
  var step = 0.00001;
  var iterMax = 39;

  //Check for valid inputs
  if (guess <= -1) {
    throw new Error("Invalid guess");
  }

  if (values.length < 1) {
    return null;
  }

  //Scale up the Epsilon Max based on cash flow values
  var tempVar = values[0] > 0 ? values[0] : values[0] * -1;
  var i = 0;

  while (i < values.length) {
    if (Math.abs(values[i]) > tempVar) {
      tempVar = Math.abs(values[i]);
    }
    i++;
  }

  const tempNpvEpsl = tempVar * epslMax * 0.01;

  let tempRate0 = guess;
  let tempNpv0 = internalPv(values, tempRate0);

  var tempRate1 = tempNpv0 > 0 ? tempRate0 + step : tempRate0 - step;

  if (tempRate1 <= -1) {
    throw new Error("Invalid values");
  }

  var tempNpv1 = internalPv(values, tempRate1);

  var i = 0;

  while (i <= iterMax) {
    if (tempNpv1 === tempNpv0) {
      tempRate0 = tempRate1 > tempRate0 ? tempRate0 - step : tempRate0 + step;

      tempNpv0 = internalPv(values, tempRate0);

      if (tempNpv1 === tempNpv0) {
        throw new Error("Invalid values");
      }
    }

    tempRate0 =
      tempRate1 - ((tempRate1 - tempRate0) * tempNpv1) / (tempNpv1 - tempNpv0);

    //Secant method
    if (tempRate0 <= -1) {
      tempRate0 = (tempRate1 - 1) * 0.5;
    }

    //Give the algorithm a second chance...
    tempNpv0 = internalPv(values, tempRate0);
    tempVar =
      tempRate0 > tempRate1 ? tempRate0 - tempRate1 : tempRate1 - tempRate0;

    var tempVar2 = tempNpv0 > 0 ? tempNpv0 : tempNpv0 * -1;

    //Test for npv = 0 and rate convergence
    if (tempVar2 < tempNpvEpsl && tempVar < epslMax) {
      return tempRate0;
    }
    //Transfer values and try again...
    tempVar = tempNpv0;
    tempNpv0 = tempNpv1;
    tempNpv1 = tempVar;
    tempVar = tempRate0;
    tempRate0 = tempRate1;
    tempRate1 = tempVar;

    i++;
  }
  throw new Error("Maximum iterations exceeded");
};
