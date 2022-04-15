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
): number => {
  if (rate === 0) {
    return pv + pmt * nper + fv;
  } else {
    const tmp3 = rate + 1;
    const tmp = Math.pow(tmp3, nper);

    const tmp2 = type !== 0 ? 1 + rate : 1;

    return pv * tmp + (pmt * tmp2 * (tmp - 1)) / rate + fv;
  }
};
