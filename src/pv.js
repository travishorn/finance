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

export default (rate, nper, pmt, fv, type) => {
  type = typeof type === "undefined" ? 0 : type;
  fv = typeof fv === "undefined" ? 0 : fv;

  if (rate === 0) {
    return -pmt * nper - fv;
  } else {
    var tempVar = type !== 0 ? 1 + rate : 1;
    var tempVar2 = 1 + rate;
    var tempVar3 = Math.pow(tempVar2, nper);

    return -(fv + pmt * tempVar * ((tempVar3 - 1) / rate)) / tempVar3;
  }
};
