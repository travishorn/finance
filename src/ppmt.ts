/*
 * Math:
 *
 * Since a regular payment is the essentially the interest payment plus the
 * principal payment:
 *
 * ppmt = pmt - ipmt
 */

import ipmt from "./ipmt.js";
import pmt from "./pmt.js";

/**
 * Calculates the portion of a regular payment that is applied to principal.
 * 
 * @param rate - Interest rate per the period
 * @param per - Specific period
 * @param nper - Number of periods
 * @param pv - Present value
 * @param fv - Future value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @returns The portion of a regular payment that is applied to the principal
 */
export default (
  rate: number,
  per: number,
  nper: number,
  pv: number,
  fv?: number,
  type?: boolean
): number => {
  if (per <= 0 || per >= nper + 1) throw new Error("Invalid period");

  const pmtx = pmt(rate, nper, pv, fv, type);
  const tmpIPMT = ipmt(rate, per, nper, pv, fv, type);

  return pmtx - tmpIPMT;
};
