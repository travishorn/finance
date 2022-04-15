// --------------------------------------------------------------------
// Calculates the value of the payment based on rate, periods,
// present value (as a negative).  Future value and type
// (0 as in arrears, 1 as in advance) are optional fields.
//
// ## Math:
//
//                                          (1+rate)^nper - 1
//  pv * (1+rate)^nper + pmt*(1+rate*type)*------------------ + fv = 0
//                                                rate
// If rate equals zero:
// pv + pmt*nper + fv = 0
//
//           (-fv - pv*(1+rate)^nper) * rate
//  pmt = ---------------------------------------
//         (1+rate*type) * ( (1+rate)^nper - 1 )
//
// If rate equals zero::
//
//  pmt = (-fv - pv) / nper
//
// Returns a number.
// --------------------------------------------------------------------
//

export default (
  rate: number,
  nper: number,
  pv: number,
  fv: number = 0,
  type: number = 0
) => {
  if (rate === 0) return (-fv - pv) / nper;

  const tmp = type !== 0 ? 1 + rate : 1;
  const tmp2 = rate + 1;
  const tmp3 = Math.pow(tmp2, nper);

  return ((-fv - pv * tmp3) / (tmp * (tmp3 - 1))) * rate;
};
