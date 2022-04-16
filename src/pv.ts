/*
 * Math:
 *
 *          -fv + pmt*(1_rate*type) / ( (1+rate)^nper-1) / rate
 *    pv = ------------------------------------------------------
 *                         (1 + rate) ^ nper
 *
 * If rate equals zero, there is no time value of money calculations needed, and
 * the function returns:
 *
 *    pv = -fv - pmt * nper
 */

/**
 * Calculates the present value based on rate, payment, and number of periods.
 * 
 * @param rate - Interest rate per the period
 * @param nper - Number of periods
 * @param pmt - Regular payment (must be equal in total value for all periods)
 * @param fv - Future value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @returns The present value
 */
export default (
  rate: number,
  nper: number,
  pmt: number,
  fv: number = 0,
  type: boolean = false
): number => {
  if (rate === 0) return -pmt * nper - fv;

  const tmp = type ? 1 + rate : 1;
  const tmp2 = 1 + rate;
  const tmp3 = Math.pow(tmp2, nper);

  return -(fv + pmt * tmp * ((tmp3 - 1) / rate)) / tmp3;
};
