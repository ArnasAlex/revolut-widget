import {
  addAmount,
  convertAmount,
  parseAmountInput,
  round,
  subtractAmount,
} from "./number";

describe("utils", () => {
  describe("number", () => {
    describe("round", () => {
      it("returns rounded number to two decimal places", () => {
        const result = round("100.4232");
        expect(result).toStrictEqual("100.42");
      });

      it("does not add leading zeros", () => {
        const result = round("100.00");
        expect(result).toStrictEqual("100");
      });
    });

    describe("convertAmount", () => {
      it("calculates amount correctly", () => {
        const result = convertAmount("20.5", "1.3");
        expect(result).toStrictEqual("26.65");
      });

      it("rounds to two decimal places", () => {
        const result = convertAmount("1.11111", "2");
        expect(result).toStrictEqual("2.22");
      });

      it("does not add leading zeros", () => {
        const result = convertAmount("1.00", "2");
        expect(result).toStrictEqual("2");
      });

      it("returns empty string when amount is empty", () => {
        const result = convertAmount("", "1.3");
        expect(result).toStrictEqual("");
      });

      it("returns empty string when rate is empty", () => {
        const result = convertAmount("3", "");
        expect(result).toStrictEqual("");
      });
    });

    describe("parseAmountInput", () => {
      it("returns same string if input is valid", () => {
        const result = parseAmountInput("20.5");
        expect(result).toStrictEqual("20.5");
      });

      it("rounds to two decimal places", () => {
        const result = parseAmountInput("20.1111");
        expect(result).toStrictEqual("20.11");
      });

      it("replaces ',' char to '.' char", () => {
        const result = parseAmountInput("20,3");
        expect(result).toStrictEqual("20.3");
      });

      it("leaves '.' char at the end", () => {
        const result = parseAmountInput("5.");
        expect(result).toStrictEqual("5.");
      });

      it("replaces ',' char at the end", () => {
        const result = parseAmountInput("5,");
        expect(result).toStrictEqual("5.");
      });

      it("allows only numbers", () => {
        const result = parseAmountInput("abc");
        expect(result).toStrictEqual("");
      });

      it("allows leading zero", () => {
        const result = parseAmountInput("12.0");
        expect(result).toStrictEqual("12.0");
      });

      it("allows two leading zeros", () => {
        const result = parseAmountInput("12.00");
        expect(result).toStrictEqual("12.00");
      });

      it("does not allow three leading zeros", () => {
        const result = parseAmountInput("12.000");
        expect(result).toStrictEqual("12.00");
      });
    });

    describe("subtractAmount", () => {
      it("returns subtracted amount", () => {
        const result = subtractAmount("20.5", "3");
        expect(result).toStrictEqual("17.5");
      });
    });

    describe("addAmount", () => {
      it("returns added amount", () => {
        const result = addAmount("20.5", "3");
        expect(result).toStrictEqual("23.5");
      });
    });
  });
});
