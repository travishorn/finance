// --------------------------------------------------------------------
// Calculates the present value based on rate, payment,
// and number of periods.  Future value and type
// (0 as in arrears, 1 as in advance) are optional fields.
//
// ## Math:
//
//          -fv + pmt*(1_rate*type) / ( (1+rate)^nper-1) / rate
//    pv = ------------------------------------------------------
//                         (1 + rate) ^ nper
//
// If rate equals zero, there is no time value of money
// Calculations needed, and the function returns:
//
//    pv = -fv - pmt * nper
//
// Returns a number.
// --------------------------------------------------------------------
//

export default (
  rate: number,
  nper: number,
  pmt: number,
  fv: number = 0,
  type: number = 0
): number => {
  if (rate === 0) return -pmt * nper - fv;

  const tmp = type !== 0 ? 1 + rate : 1;
  const tmp2 = 1 + rate;
  const tmp3 = Math.pow(tmp2, nper);

  return -(fv + pmt * tmp * ((tmp3 - 1) / rate)) / tmp3;
};
