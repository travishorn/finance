// --------------------------------------------------------------------
// internalPv is a local helper function for the
// IRR calculation.
// --------------------------------------------------------------------
//

export default (values: number[], guess: number): number => {
  guess = typeof guess === "undefined" ? 0.1 : guess;

  let lowerBound = 0;
  const upperBound = values.length - 1;

  let tmpTotal = 0;
  const divRate = 1 + guess;

  while (lowerBound <= upperBound && values[lowerBound] === 0) {
    lowerBound++;
  }

  let i = upperBound;
  const step = -1;

  while (i >= lowerBound) {
    tmpTotal = tmpTotal / divRate;
    tmpTotal = tmpTotal + values[i];
    i = i + step;
  }
  return tmpTotal;
};
