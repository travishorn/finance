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

export default (
  rate: number,
  per: number,
  nper: number,
  pv: number,
  fvx: number = 0,
  type: number = 0
): number => {
  const tmp = type !== 0 ? 2 : 1;

  if (per <= 0 || per >= nper + 1) throw new Error("Invalid period");

  if (type !== 0 && per === 1) return 0;

  const pmtx = pmt(rate, nper, pv, fvx, type);
  const pv2 = type !== 0 ? pv + pmtx : pv;
  const tmpFV = fv(rate, per - tmp, pmtx, pv2);

  return tmpFV * rate;
};
