// --------------------------------------------------------------------
// This function calculates the portion of a regular payment that is
// applied to principal based on rate, which period to calculate, the
// total number of periods, and the present value.  The future value and
// type are optional.
//
// ## Math:
//
// Since a regular payment is the essentially the Interest Payment plus
// the Principal Payment:
//
// ppmt = pmt - ipmt
//
// Returns either a number or error message (as string).
// --------------------------------------------------------------------
//

import ipmt from "./ipmt.js";
import pmt from "./pmt.js";

export default (rate, per, nper, pv, fv, type) => {
  if (per <= 0 || per >= nper + 1) {
    throw new Error("Invalid period");
  }

  var pmtx = pmt(rate, nper, pv, fv, type);
  var tempVarIPMT = ipmt(rate, per, nper, pv, fv, type);

  return pmtx - tempVarIPMT;
};