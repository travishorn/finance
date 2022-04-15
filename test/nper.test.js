import { expect } from "chai";
import nper from "../src/nper.js";

describe("nper function", () => {
  it("matches Excel to 8 decimal places", () => {
    expect(nper(0.00166666666666667, 500, -25000)).to.be.closeTo(
      52.2503198074182,
      8
    );
    expect(nper(0.0025, 564, -25000)).to.be.closeTo(47.0389585221301, 8);
    expect(nper(0.0075, 5848, -50000, 564654, 1)).to.be.closeTo(
      -160.977634983543,
      8
    );
    expect(nper(0.00833333333333333, 313, -33000, 0, 1)).to.be.closeTo(
      247.087289465708,
      8
    );
    expect(nper(0.05, 2500, -15330, 456, 1)).to.be.closeTo(6.89867591269445, 8);
    expect(nper(0.00916666666666667, 1654, -13546)).to.be.closeTo(
      8.55253223758902,
      8
    );
    expect(nper(0.0158333333333333, 515615, -854893, 0, 1)).to.be.closeTo(
      1.66668098571988,
      8
    );
    expect(nper(0.0225, 6566, -551321, 9654564, 1)).to.be.closeTo(
      162.27277971901,
      8
    );
    expect(nper(0.015, 6468, -56544)).to.be.closeTo(9.44102400572401, 8);
    expect(nper(0.00333333333333333, 1566, -65448, 546)).to.be.closeTo(
      44.7319121056356,
      8
    );
  });

  it("throws an error when NPER cannot be calculated", () => {
    expect(() => nper(0.025, 0, -2344)).to.throw("Cannot calculate NPER");
  });

  it("throws an error when payment is 0", () => {
    expect(() => nper(0, 0, -2000)).to.throw("Payment cannot be 0");
  });
});
