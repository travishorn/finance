// --------------------------------------------------------------------
// Calculates the number of periods based on rate, payment,
// present value (as a negative).  Future value and type
// (0 as in arrears, 1 as in advance) are optional fields.
//
// ## Math:
//
//                       -fv + pmt*(1_rate*type) / rate
//     (1+rate)^nper = ----------------------------------
//                        pv + pmt*(1+rate*type) / rate
//
// This output is then used in the log function.
//
// If rate equals zero, there is no time value of money
// Calculations needed, and the function returns:
//
//     nper = (-fv - pv) / pmt
//
// Returns either a number or error message (as string).
// --------------------------------------------------------------------
//

export default (
  rate: number,
  pmt: number,
  pv: number,
  fv: number,
  type: number
) => {
  type = typeof type === "undefined" ? 0 : type;
  fv = typeof fv === "undefined" ? 0 : fv;

  if (rate === 0) {
    if (pmt === 0) {
      throw new Error("Payment cannot be 0");
    } else {
      return -(pv + fv) / pmt;
    }
  } else {
    var tempVar = type !== 0 ? (pmt * (1 + rate)) / rate : pmt / rate;
  }

  var tempVarFV = -fv + tempVar;
  var tempVarPV = pv + tempVar;

  // Test to ensure values fit within log() function
  if (tempVarFV < 0 && tempVarPV < 0) {
    tempVarFV = tempVarFV * -1;
    tempVarPV = tempVarPV * -1;
  } else if (tempVarFV <= 0 || tempVarPV <= 0) {
    throw new Error("Cannot calculate NPER");
  }

  var tempVar2 = rate + 1;

  return (Math.log(tempVarFV) - Math.log(tempVarPV)) / Math.log(tempVar2);
};
