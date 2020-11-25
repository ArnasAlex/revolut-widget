import { convertAmount, parseAmountInput, round } from "./number";

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
    });
  });
});
