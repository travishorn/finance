// --------------------------------------------------------------------
// evalRate is a local helper function for the
// RATE calculation.  It follows a similar
// Pattern to the PMT formula above.
// --------------------------------------------------------------------
//

export default (
  rate: number,
  nper: number,
  pmt: number,
  pv: number,
  fv: number,
  type: number
) => {
  if (rate === 0) {
    return pv + pmt * nper + fv;
  } else {
    var tempVar3 = rate + 1;
    var tempVar = Math.pow(tempVar3, nper);

    var tempVar2 = type !== 0 ? 1 + rate : 1;

    return pv * tempVar + (pmt * tempVar2 * (tempVar - 1)) / rate + fv;
  }
};
