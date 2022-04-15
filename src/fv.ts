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
  type?: number
) => {
  type = typeof type === "undefined" ? 0 : type;

  if (rate === 0) {
    return -pv - pmt * nper;
  } else {
    var tempVar = type !== 0 ? 1 + rate : 1;
    var tempVar2 = 1 + rate;
    var tempVar3 = Math.pow(tempVar2, nper);

    return -pv * tempVar3 - (pmt / rate) * tempVar * (tempVar3 - 1);
  }
};
