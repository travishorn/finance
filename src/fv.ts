// --------------------------------------------------------------------
// This function returns the calculated future value given a set of
// transaction terms. It takes rate, number of periods, payment, and
// present value as inputs. Type is an optional input as well.
//
// ## Math:
//
//                                              (1+rate)^nper -1
//  fv = -pv*(1+rate)^nper - pmt*(1+rate*type)*------------------
//                                                   rate
//
// If rate equals 0, there is no time value of money consideration and
// fv = -pv - pmt * nper
//
// Returns a number.
// --------------------------------------------------------------------
//

export default (
  rate: number,
  nper: number,
  pmt: number,
  pv: number,
  type: number = 0
) => {
  if (rate === 0) return -pv - pmt * nper;

  const tmp = type !== 0 ? 1 + rate : 1;
  const tmp2 = 1 + rate;
  const tmp3 = Math.pow(tmp2, nper);

  return -pv * tmp3 - (pmt / rate) * tmp * (tmp3 - 1);
};
