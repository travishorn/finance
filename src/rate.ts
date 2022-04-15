// --------------------------------------------------------------------
// This function returns the estimated contract rate based on the
// Number of periods, the regular payment, and the present value.
// Future value, type, and guess (an estimate for the rate) are
// optional.
//
// This function is not as simple as the other functions, since it
// is not possible to solve for rate algebraically. The formula
// leverages a secant method of approximation using guess (either
// provided by the user or defaulted to 10%) as a starting point.
//
// ## Math:
//
// Use Guess to determine Rate0 and Rate1.  Use the helper function
// evalRate to determine Y0 and Y1 respectively.
//
//  Iterate through:
//                                             Y0
//   New Rate0 = Rate1 - (Rate1 - Rate0) * -----------
//                                          (Y1 - Y0)
//
// Get new Y0.  Move New Rate0 to Rate1 and repeat.
// Stop when the absolute value of Y0 < epsilon max tolerance.
//
// Returns either a number or an error (as string).
// --------------------------------------------------------------------
//

import evalRate from "./evalRate.js";

export default (
  nperx: number,
  pmt: number,
  pv: number,
  fv: number,
  type: number,
  guess: number
) => {
  type = typeof type === "undefined" ? 0 : type;
  fv = typeof fv === "undefined" ? 0 : fv;
  guess = typeof guess === "undefined" ? 0.1 : guess;

  if (nperx <= 0) {
    throw new Error("Invalid period");
  }

  // Variables for epsilon max and step from Microsoft reference docs.
  var epslMax = 0.0000001;
  var step = 0.00001;
  // Microsoft reference docs show 40 iterations (i = 0 to 39)
  // But I was running into undefined errors when the Guess was
  // Far off the actual Rate.  Increasing the iterations to 129
  // (i = 0 to 128) allowed enough iterations to get rates
  // Within 8 decimal places of Excel for my test suite.
  var iterMax = 128;

  var Rate0 = guess;
  var Y0 = evalRate(Rate0, nperx, pmt, pv, fv, type);

  var Rate1 = Y0 > 0 ? Rate0 / 2 : Rate0 * 2;
  var Y1 = evalRate(Rate1, nperx, pmt, pv, fv, type);

  var i = 0;

  while (i < iterMax) {
    if (Y1 === Y0) {
      Rate0 = Rate0 < Rate1 ? Rate0 - step : Rate0 - step * -1;

      Y0 = evalRate(Rate0, nperx, pmt, pv, fv, type);
    }

    if (Y1 === Y0) {
      return "#NUM!";
    }

    Rate0 = Rate1 - ((Rate1 - Rate0) * Y1) / (Y1 - Y0);
    Y0 = evalRate(Rate0, nperx, pmt, pv, fv, type);

    if (Math.abs(Y0) < epslMax) {
      return Rate0;
    } else {
      var tempVar = Y0;
      Y0 = Y1;
      Y1 = tempVar;
      tempVar = Rate0;
      Rate0 = Rate1;
      Rate1 = tempVar;
    }
    i++;
  }
};
