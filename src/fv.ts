/*
 * Math:
 *
 *                                              (1+rate)^nper -1
 *  fv = -pv*(1+rate)^nper - pmt*(1+rate*type)*------------------
 *                                                   rate
 * 
 * If rate equals 0, there is no time value of money consideration and
 * fv = -pv - pmt * nper
 */

/**
 * Calculate the future value given a set of transaction terms.
 * 
 * @param rate - Interest rate per the period
 * @param nper - Number of periods
 * @param pmt - Regular payment (must be equal in total value for all periods)
 * @param pv - Present value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @returns The calculated future value
 */
export default (
  rate: number,
  nper: number,
  pmt: number,
  pv: number,
  type: boolean = false
): number => {
  if (rate === 0) return -pv - pmt * nper;

  const tmp = type ? 1 + rate : 1;
  const tmp2 = 1 + rate;
  const tmp3 = Math.pow(tmp2, nper);

  return -pv * tmp3 - (pmt / rate) * tmp * (tmp3 - 1);
};
