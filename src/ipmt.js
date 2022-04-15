// --------------------------------------------------------------------
// This function will calculate the interest portion of a payment
// for a given period of a set payment stream. It takes rate, the
// specific period, total number of periods, and present value as
// inputs.  It also has future value and type as optional inputs.
//
// The formula leverages the PMT and FV formulas. Essentially,
// it calculates what the future value is at the start of the target
// period. Since rate is constant for the period, fv * rate will
// provide the interest portion during that period.
//
// If the period is set as 1 and payments are due in advance (type = 1)
// then no interest is due and the function returns 0.
//
// ## Math:
//
// IF payments are in arrears (type === 0), then:
//   IPMT = fv(per-1)*rate
// Else
//   IPMT = FV(per-2)*rate
//
// Returns either a number or error (as string).
// --------------------------------------------------------------------
//

import pmt from "./pmt.js";
import fv from "./fv.js";

export default (rate, per, nper, pv, fvx, type) => {
  type = typeof type === "undefined" ? 0 : type;
  fvx = typeof fvx === "undefined" ? 0 : fvx;

  var tempVar = type !== 0 ? 2 : 1;

  if (per <= 0 || per >= nper + 1) {
    throw new Error("Invalid period");
  }

  if (type !== 0 && per === 1) {
    return 0;
  }

  var pmtx = pmt(rate, nper, pv, fvx, type);
  pv = type !== 0 ? pv + pmtx : pv;
  var tempVarFV = fv(rate, per - tempVar, pmtx, pv);

  return tempVarFV * rate;
};
