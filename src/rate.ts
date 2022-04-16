/*
 * Math:
 *
 * Use a guess to determine Rate0 and Rate1. Use the helper function evalRate to
 * determine Y0 and Y1 respectively.
 *
 *  Iterate through:
 *                                             Y0
 *   New Rate0 = Rate1 - (Rate1 - Rate0) * -----------
 *                                          (Y1 - Y0)
 *
 * Get new Y0. Move New Rate0 to Rate1 and repeat. Stop when the absolute value
 * of Y0 < epsilon max tolerance.
 */


/**
 * Calculates the estimated contract rate based on the number of periods, the
 * regular payment, and the present value.
 * 
 * @remarks
 * Leverages a secant method of approximation using a guess (deafult 10%) as a
 * starting point
 * 
 * @param nper - Number of periods
 * @param pmt - Regular payment (must be equal in total value for all periods)
 * @param pv - Present value
 * @param fv - Future value
 * @param type - When payments are due. false = end of period (default). true =
 * beginning of period
 * @param guess - A guess at the rate
 * @returns The estimated contract rate
 */
import evalRate from "./evalRate.js";

export default (
  nper: number,
  pmt: number,
  pv: number,
  fv: number = 0,
  type: number = 0,
  guess: number = 0.1
): number => {
  if (nper <= 0) throw new Error("Invalid period");

  // Variables for epsilon max and step from Microsoft reference docs.
  const epslMax = 0.0000001;
  const step = 0.00001;
  // Microsoft reference docs show 40 iterations but that few iterations cause
  // undefined errors when the guess is far off the actual rate. Increasing the
  // iterations to 129 allows enough iterations to get rates within 8 decimal
  // places of Excel.
  const iterMax = 128;

  let Rate0 = guess;
  let Y0 = evalRate(Rate0, nper, pmt, pv, fv, type);

  let Rate1 = Y0 > 0 ? Rate0 / 2 : Rate0 * 2;
  let Y1 = evalRate(Rate1, nper, pmt, pv, fv, type);

  let i = 0;

  while (i < iterMax) {
    if (Y1 === Y0) {
      Rate0 = Rate0 < Rate1 ? Rate0 - step : Rate0 - step * -1;

      Y0 = evalRate(Rate0, nper, pmt, pv, fv, type);
    }

    if (Y1 === Y0) throw new Error("Cannot calculate RATE");

    Rate0 = Rate1 - ((Rate1 - Rate0) * Y1) / (Y1 - Y0);
    Y0 = evalRate(Rate0, nper, pmt, pv, fv, type);

    if (Math.abs(Y0) < epslMax) {
      return Rate0;
    } else {
      let tmp = Y0;

      Y0 = Y1;
      Y1 = tmp;
      tmp = Rate0;
      Rate0 = Rate1;
      Rate1 = tmp;
    }
    i++;
  }
};
