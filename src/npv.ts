/*
 * Math:
 *
 *        Value 1        Value 2             Value N
 * npv = ---------- + ------------- + ... -------------
 *       (1 + rate)   (1 + rate)^2         (1 + rate)^N
 */

import evalNpv from "./evalNpv.js";

/**
 * Calculate the net present value of a series of payments at a constant rate.
 *
 * @param rate - Interest rate per the period
 * @param values - A set of periodic cash flows
 * @returns The net present value
 */
export default (rate: number, ...values: number[]): number => {
  const lowerBound = 0;
  const upperBound = values.length - 1;
  const tmp = upperBound - lowerBound + 1;

  if (tmp < 1) throw new Error("Invalid values");

  if (rate === -1) throw new Error("Invalid rate");

  return evalNpv(rate, values, 0, lowerBound, upperBound);
};
