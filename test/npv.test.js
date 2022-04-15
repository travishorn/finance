import { expect } from "chai";
import npv from "../dist/npv.js";

describe("npv function", () => {
  it("matches Excel to 8 decimal places)", () => {
    expect(npv(0.02, -50000, 91332, 95379, 83519)).to.be.closeTo(
      205802.267367961,
      8
    );
    expect(npv(0.03, -43006, 60264, 23129, 34643)).to.be.closeTo(
      66997.3700499066,
      8
    );
    expect(npv(0.09, -54404, 60439, 11971, 95653)).to.be.closeTo(
      77965.1756613633,
      8
    );
    expect(npv(0.1, -80427, -89098, 47970, 40361)).to.be.closeTo(
      -83142.4882180179,
      8
    );
    expect(npv(0.2, -12552, 41244, -93702, 84914)).to.be.closeTo(
      4906.01080246914,
      8
    );
    expect(npv(0.11, 78850, 12109, 35278, 97086)).to.be.closeTo(
      170612.496985565,
      8
    );
    expect(npv(0.19, -13182, 26250, 49352, 54732)).to.be.closeTo(
      64038.9109341756,
      8
    );
    expect(npv(0.09, -41941, 21473, -20029, 61674)).to.be.closeTo(
      7820.76638912857,
      8
    );
    expect(npv(0.18, -40433, 39029, 31605, -68195)).to.be.closeTo(
      -22173.6777380818,
      8
    );
    expect(npv(0.04, -89316, 66418, 54279, 60256)).to.be.closeTo(
      75287.3200124295,
      8
    );
  });

  it("throws an error on invalid rates", () => {
    expect(() => npv(-1, -89316, 66418, 54279, 60256)).to.throw("Invalid rate");
  });

  it("throws an error on invalid values", () => {
    expect(() => npv(0.04)).to.throw("Invalid values");
  });
});
