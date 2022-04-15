import { expect } from "chai";
import pmt from "../src/pmt.js";

describe("pmt function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(pmt(0.0525, 5, -10000)).to.be.closeTo(2325.7331680465, 8);
    expect(pmt(0.006875, 60, -150000, 0, 1)).to.be.closeTo(3038.547734125, 8);
    expect(pmt(0.0275, 10, -25566, 500)).to.be.closeTo(2914.88183332968, 8);
    expect(pmt(0.025 / 12, 180, -55555, 1000, 1)).to.be.closeTo(
      365.089583010248,
      8
    );
    expect(pmt(0.22, 1, -15000)).to.be.closeTo(18300.0, 8);
  });
});
