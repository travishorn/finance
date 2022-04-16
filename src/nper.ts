/*
 * Math:
 *
 *                   -fv + pmt*(1_rate*type) / rate
 * (1+rate)^nper = ----------------------------------
 *                    pv + pmt*(1+rate*type) / rate
 * 
 * This output is then used in the log function.
 * 
 * If rate equals zero, there is no time value of money calculations needed, and
 * the formula is: nper = (-fv - pv) / pmt
 * 
 */

/**
 * Calculate the number of periods based on rate, payment, present value (as a
 * negative).
 *
 * @param rate - Interest rate per the period
 * @param pmt - Regular payment (must be equal in total value for all periods)
 * @param pv - Present value
 * @param fv - Future value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @returns The number of periods
 */
export default (
  rate: number,
  pmt: number,
  pv: number,
  fv: number = 0,
  type: number = 0
): number => {
  if (rate === 0 && pmt === 0) throw new Error("Payment cannot be 0");
  if (rate === 0) return -(pv + fv) / pmt;

  const tmp = type !== 0 ? (pmt * (1 + rate)) / rate : pmt / rate;
  let tmpFV = -fv + tmp;
  let tmpPV = pv + tmp;

  // Test to ensure values fit within log() function
  if (tmpFV < 0 && tmpPV < 0) {
    tmpFV = tmpFV * -1;
    tmpPV = tmpPV * -1;
  } else if (tmpFV <= 0 || tmpPV <= 0) {
    throw new Error("Cannot calculate NPER");
  }

  const tmp2 = rate + 1;

  return (Math.log(tmpFV) - Math.log(tmpPV)) / Math.log(tmp2);
};
