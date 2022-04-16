/*
 * Math:
 *
 * If the period is set as 1 and payments are due in advance (type === true)
 * then no interest is due and the function returns 0.
 *
 * If payments are in arrears (type === false), then ipmt = fv(per-1)*rate If
 * payments are not in arrers (type === true), then ipmt = FV(per-2)*rate
 */

import pmt from "./pmt.js";
import evalFv from "./fv.js";

/**
 * Calculate the interest portion of a payment for a given period of a set
 * payment stream.
 *
 * @remarks
 * The formula leverages the `pmt` and `fv` functions. Essentially, it
 * calculates what the future value is at the start of the target period. Since
 * rate is constant for the period, fv * rate will provide the interest portion
 * during that period.
 *
 * @param rate - Interest rate per the period
 * @param per - Specific period
 * @param nper - Number of periods
 * @param pv - Present value
 * @param fv - Future value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @returns The calculated interest portion
 */
export default (
  rate: number,
  per: number,
  nper: number,
  pv: number,
  fv: number = 0,
  type: boolean = false
): number => {
  const tmp = type ? 2 : 1;

  if (per <= 0 || per >= nper + 1) throw new Error("Invalid period");

  if (type && per === 1) return 0;

  const pmtx = pmt(rate, nper, pv, fv, type);
  const pv2 = type ? pv + pmtx : pv;
  const tmpFV = evalFv(rate, per - tmp, pmtx, pv2);

  return tmpFV * rate;
};
