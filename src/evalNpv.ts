// --------------------------------------------------------------------
// evalNpv is a local helper function for the
// NPV calculation.
// --------------------------------------------------------------------
//

export default (
  rate: number,
  values: number[],
  npvType: number,
  lowerBound: number,
  upperBound: number
): number => {
  let tmp = 1;
  let tmpTotal = 0;
  let i = lowerBound;

  while (i <= upperBound) {
    const tmp2 = values[i];
    tmp = tmp + tmp * rate;

    if (!(npvType > 0 && tmp2 > 0) || !(npvType < 0 && tmp2 < 0)) {
      tmpTotal = tmpTotal + tmp2 / tmp;
    }
    i++;
  }
  return tmpTotal;
};
