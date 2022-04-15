import { expect } from "chai";
import pv from "../dist/pv.js";

describe("pv function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(pv(0.0525, 5, 6000)).to.be.closeTo(-25798.316343571, 8);
    expect(pv(0.0688, 10, 150000, 10000)).to.be.closeTo(-1064546.96972161, 8);
    expect(pv(0.006875, 60, 3250, 0, 1)).to.be.closeTo(-160438.486624723, 8);
    expect(pv(0.11 / 12, 180, 525, 50)).to.be.closeTo(-46200.1919210731, 8);
    expect(pv(0.010625, 8, 32.5, 0, 1)).to.be.closeTo(-250.631442440053, 8);
  });
});
