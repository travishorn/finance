// --------------------------------------------------------------------
// This function calculates the net present value of a series of
// payments at a constant rate.  It uses the helper function, evalNpv,
// to assist in determining the value.  Between this function and
// evalNpv, the math is as follows:
//
// ## Math:
//
//         Value 1        Value 2             Value N
//  npv = ---------- + ------------- + ... -------------
//        (1 + rate)   (1 + rate)^2         (1 + rate)^N
//
// Returns either a number or error message (as string).
// --------------------------------------------------------------------
//

import evalNpv from "./evalNpv.js";

export default (rate, ...values) => {
  var lowerBound = 0;
  var upperBound = values.length - 1;
  var tempVar = upperBound - lowerBound + 1;

  if (tempVar < 1) {
    throw new Error("Invalid values");
  }

  if (rate === -1) {
    throw new Error("Invalid rate");
  }

  return evalNpv(rate, values, 0, lowerBound, upperBound);
};
