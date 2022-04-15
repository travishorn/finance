// --------------------------------------------------------------------
// internalPv is a local helper function for the
// IRR calculation.
// --------------------------------------------------------------------
//

export default (values, guess) => {
  guess = typeof guess === "undefined" ? 0.1 : guess;

  var lowerBound = 0;
  var upperBound = values.length - 1;

  var tempTotal = 0;
  var divRate = 1 + guess;

  while (lowerBound <= upperBound && values[lowerBound] === 0) {
    lowerBound++;
  }

  var i = upperBound;
  var step = -1;

  while (i >= lowerBound) {
    tempTotal = tempTotal / divRate;
    tempTotal = tempTotal + values[i];
    i = i + step;
  }
  return tempTotal;
};
