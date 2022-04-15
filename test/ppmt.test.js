import { expect } from "chai";
import ppmt from "../dist/ppmt.js";

describe("ppmt function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(ppmt(0.02, 5, 5, -608926, 37115, 0)).to.be.closeTo(
      118935.787736457,
      8
    );
    expect(ppmt(0.0025, 9, 24, -62088, 16679, 0)).to.be.closeTo(
      1875.2988823337,
      8
    );
    expect(ppmt(0.0075, 1, 36, -303575, 0, 1)).to.be.closeTo(
      9581.74078634391,
      8
    );
    expect(ppmt(0.00833333333333333, 56, 240, -244184, 40099, 1)).to.be.closeTo(
      420.708247831785,
      8
    );
    expect(ppmt(0.05, 4, 8, -204252, 4793, 1)).to.be.closeTo(
      23028.6983173609,
      8
    );
    expect(ppmt(0.00916666666666667, 10, 60, -276452, 0, 0)).to.be.closeTo(
      3774.15668897321,
      8
    );
    expect(ppmt(0.0158333333333333, 98, 180, -740363, 1255, 1)).to.be.closeTo(
      3324.09497421923,
      8
    );
    expect(ppmt(0.0225, 4, 16, -324779, 0, 1)).to.be.closeTo(
      17866.4226038686,
      8
    );
    expect(ppmt(0.015, 36, 48, -518630, 39718, 0)).to.be.closeTo(
      11592.444876619,
      8
    );
    expect(
      ppmt(0.00333333333333333, 244, 360, -490152, 36758, 0)
    ).to.be.closeTo(1466.48935600409, 8);
  });

  it("throws an error on invalid periods", () => {
    expect(() => ppmt(0.0525, 0, 24, -10000)).to.throw("Invalid period");
    expect(() => ppmt(0.0525, 25, 24, -10000)).to.throw("Invalid period");
  });
});
