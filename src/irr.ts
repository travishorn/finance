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

export default (values: number[], guess: number = 0.1): number => {
  const epslMax = 0.0000001;
  const step = 0.00001;
  const iterMax = 39;

  //Check for valid inputs
  if (guess <= -1) throw new Error("Invalid guess");

  if (values.length < 1) return null;

  //Scale up the Epsilon Max based on cash flow values
  let tmp = values[0] > 0 ? values[0] : values[0] * -1;

  values.forEach((value) => {
    if (Math.abs(value) > tmp) tmp = Math.abs(value);
  });

  const tmpNpvEpsl = tmp * epslMax * 0.01;

  let tmpRate0 = guess;
  let tmpNpv0 = internalPv(values, tmpRate0);

  let tmpRate1 = tmpNpv0 > 0 ? tmpRate0 + step : tmpRate0 - step;

  if (tmpRate1 <= -1) throw new Error("Invalid values");

  let tmpNpv1 = internalPv(values, tmpRate1);

  let i = 0;

  while (i <= iterMax) {
    if (tmpNpv1 === tmpNpv0) {
      tmpRate0 = tmpRate1 > tmpRate0 ? tmpRate0 - step : tmpRate0 + step;

      tmpNpv0 = internalPv(values, tmpRate0);

      if (tmpNpv1 === tmpNpv0) {
        throw new Error("Invalid values");
      }
    }

    tmpRate0 =
      tmpRate1 - ((tmpRate1 - tmpRate0) * tmpNpv1) / (tmpNpv1 - tmpNpv0);

    //Secant method
    if (tmpRate0 <= -1) tmpRate0 = (tmpRate1 - 1) * 0.5;

    //Give the algorithm a second chance...
    tmpNpv0 = internalPv(values, tmpRate0);
    tmp = tmpRate0 > tmpRate1 ? tmpRate0 - tmpRate1 : tmpRate1 - tmpRate0;

    const tmp2 = tmpNpv0 > 0 ? tmpNpv0 : tmpNpv0 * -1;

    //Test for npv = 0 and rate convergence
    if (tmp2 < tmpNpvEpsl && tmp < epslMax) return tmpRate0;

    //Transfer values and try again...
    tmp = tmpNpv0;
    tmpNpv0 = tmpNpv1;
    tmpNpv1 = tmp;
    tmp = tmpRate0;
    tmpRate0 = tmpRate1;
    tmpRate1 = tmp;

    i++;
  }

  throw new Error("Maximum iterations exceeded");
};
