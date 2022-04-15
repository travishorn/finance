import { expect } from "chai";
import ipmt from "../src/ipmt.js";

describe("ipmt function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(ipmt(0.02, 5, 5, -608926, 37115, 0)).to.be.closeTo(
      3121.01575472915,
      8
    );
    expect(ipmt(0.0025, 9, 24, -62088, 16679, 0)).to.be.closeTo(
      118.13247244596,
      8
    );
    expect(ipmt(0.0075, 1, 36, -303575, 0, 1)).to.be.closeTo(0, 8);
    expect(ipmt(0.0083333333333333, 56, 240, -244184, 40099, 1)).to.be.closeTo(
      1863.87630524189,
      8
    );
    expect(ipmt(0.05, 4, 8, -204252, 4793, 1)).to.be.closeTo(
      6590.64284869969,
      8
    );
    expect(ipmt(0.00916666666666667, 10, 60, -276452, 0, 0)).to.be.closeTo(
      2236.57965430518,
      8
    );
    expect(ipmt(0.0158333333333333, 98, 180, -740363, 1255, 1)).to.be.closeTo(
      8939.86781612986,
      8
    );
    expect(ipmt(0.0225, 4, 16, -324779, 0, 1)).to.be.closeTo(
      5993.04338111598,
      8
    );
    expect(ipmt(0.015, 36, 48, -518630, 39718, 0)).to.be.closeTo(
      3071.36493572514,
      8
    );
    expect(
      ipmt(0.00333333333333333, 244, 360, -490152, 36758, 0)
    ).to.be.closeTo(820.609615385237, 8);
  });

  it("throws an error on invalid periods", () => {
    expect(() => ipmt(0.0525, 0, 24, -10000)).to.throw("Invalid period");
    expect(() => ipmt(0.0525, 25, 24, -10000)).to.throw("Invalid period");
  });
});
