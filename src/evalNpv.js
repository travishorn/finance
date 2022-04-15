// --------------------------------------------------------------------
// evalNpv is a local helper function for the
// NPV calculation.
// --------------------------------------------------------------------
//

export default (rate, values, npvType, lowerBound, upperBound) => {
  var tempVar = 1;
  var tempTotal = 0;
  var i = lowerBound;

  while (i <= upperBound) {
    var tempVar2 = values[i];
    tempVar = tempVar + tempVar * rate;

    if (!(npvType > 0 && tempVar2 > 0) || !(npvType < 0 && tempVar2 < 0)) {
      tempTotal = tempTotal + tempVar2 / tempVar;
    }
    i++;
  }
  return tempTotal;
};
