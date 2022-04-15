import { expect } from "chai";
import fv from "../dist/fv.js";

describe("fv function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(fv(0.0525, 8, 6000, -15000)).to.be.closeTo(-35221.9995562398, 8);
    expect(fv(0.005625, 60, 500, -30000, true)).to.be.closeTo(
      6237.61889925798,
      8
    );
    expect(fv(0.11 / 12, 24, 8025, -250000)).to.be.closeTo(96870.8884079333, 8);
    expect(fv(0.125, 6, 58, -5000, true)).to.be.closeTo(9600.18907928466, 8);
    expect(fv(0.07 / 12, 240, 1500, -200000)).to.be.closeTo(
      26357.7800581612,
      8
    );
  });
});
