# Finance

A library of common financial functions to be used in time value of money
calculations.

## Introduction

This library is a set of common finance formulas used in time value of money
calculations. The formulas are designed to have the same input style as
Microsoft Excel's finance formula of the same name, and should provide
substantially the same return values. (Unit tests all pass to the 8th decimal
place).

This library is a fork of the excellent [tvm-financejs by Kris
Karstedt](https://github.com/kgkars/tvm-financejs).

### Backstory

tvm-financejs came about as Kris Karstedt was building a small prototype
application that required some simple financial calculations for loan payments,
rate, and present value. He was very familiar with the formulas and their uses
in Excel (as was my target audience), and looked online for a JavaScript library
that had a similar formula structure for the formulas he needed. Essam Al
Joubori's great [finance.js](http://financejs.org/) had most of the formulas he
needed and in a great integration format, but was missing the critical RATE
formula. After a long search and testing of several examples of RATE formulas in
other libraries that kept providing inconsistent results compared to Excel, he
found examples of Microsoft's [source code for Excel in VBA
format](https://github.com/microsoft/referencesource/blob/master/Microsoft.VisualBasic/runtime/msvbalib/Financial.vb).
The RATE formula in this document needed a couple tweaks, but performed with
great precision compared to Excel.

This library is an attempt to refactor tvm-financejs using TypeScript, ES module
support, native error handling, newer language features, and a more functional
approach.

## Installation

Via npm

```bash
npm install @travishorn/finance
```

## Example Usage

Using named exports:

```javascript
import { pmt } from "@travishorn/finance";

// To calculate a payment:
Math.round(pmt(0.0525, 5, -10000) * 100) / 100;
// Returns 2325.73
```

Or default export:

```javascript
import finance from "@travishorn/finance";

// To calculate a payment:
Math.round(finance.pmt(0.0525, 5, -10000) * 100) / 100;
// Returns 2325.73
```

## Available Functions

### General Notes

- Just like Excel, this library does not add rounding to the outputs. In many
  cases, you may want to use these formulas in combination with each other, in
  which case a rounded output will degrade the accuracy of the final values.
- Inputs in `[ ]` are optional for the formula.
- PV is typically represented as a negative value in the inputs/outputs.
- Rate must be represented in equivalent format to the periods. (e.g. if the APR
  is 5% but the periods are monthly, you need to divide the rate by 12).

### Input Variables

| Variable   | Description                                                                                   |
| :--------- | :-------------------------------------------------------------------------------------------- |
| **pv**     | Present value                                                                                 |
| **fv**     | Future value                                                                                  |
| **pmt**    | Payment                                                                                       |
| **nper**   | Total number of periods                                                                       |
| **per**    | A specific period                                                                             |
| **rate**   | Rate for the period(s)                                                                        |
| **type**   | When payments are due (`false` = end of period/arrears. `true` = beginning of period/advance) |
| **guess**  | A guess at the rate                                                                           |
| **values** | A set of periodic cash flows                                                                  |

### Present Value

`pv(rate, nper, pmt, [fv], [type]);`

Returns the present value of an investment, or the total amount that a series of
future payments is worth now.

### Future Value

`fv(rate, nper, pmt, pv, [type]);`

Returns the future value of an investment based on periodic, equal, payments and
a constant interest rate.

### Payment

`pmt(rate, nper, pv, [fv], [type]);`

Calculates the payment for a loan based on a constant stream of equal payments
and a constant interest rate.

### Interest Payment

`ipmt(rate, per, nper, pv, [fv], [type]);`

Returns the calculated interest portion of a payment for a specific period based
on a constant stream of equal payments and a constant interest rate.

### Principal Payment

`ppmt(rate, per, nper, pv, [fv\], [type]);`

Returns the calculated principal portion of a payment for a specific period
based on a constant stream of equal payments and a constant interest rate.

### Rate

`rate(nper, pmt, pv, [fv], [type], [guess]);`

Returns the interest rate per period for a loan or investment.

### Net Present Value

`npv(rate, value1, [value2], ... [valueN]);`

Returns the net present value of an investment based on a constant rate of
return and a series of future payments/investments (as negative values) and
income/return (as positive values).

### Internal Rate of Return

`irr(values, [guess]);`

Returns the internal rate of return for a series of cash flows.

A couple of items to note about this formula:

- The variable values must be input as an array.
- There must be at least one negative and one positive value as part of the cash
  flow.
- Cash flows are assumed to be due in the same order they are arranged in the
  Array.

Example usage:

```javascript
const returnIRR = () => {
  const values = [-1500, 500, 500, 500, 500];
  return (Math.round(irr(values) * 100) / 100) * 100;
};

// returns 12.59
```

## Contributing

Feel free to contribute and add more formulas to the library. Please try to add
comments explaining the math behind the functions as they are added, and ensure
unit tests are added/updated appropriately. The library is set up to use Mocha
and Chai for unit testing.

## Testing

Each finance formula has a single test comprised of a number of sub-tests. The
tests are designed to either:

- Match the equivalent Excel formula to 8 decimal places; or
- Trigger a specific error message.

Test scenarios comprise a variety of terms, periods, types, and inputs.

To run the test suites:

```bash
npm test
```

The Excel version tested against is **Microsoft Excel for Office 365
MSO(16.0.12527.20260) 32-bit**.

## License

The MIT License (MIT)

Copyright © 2022 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
