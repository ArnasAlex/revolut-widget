import { getCcySymbol } from "./ccy";

describe("utils", () => {
  describe("ccy", () => {
    describe("getCcySymbol", () => {
      it("returns symbol when it exists in currency list", () => {
        const result = getCcySymbol("EUR");
        expect(result).toStrictEqual("€");
      });

      it("returns empty string when it does not exist in currency list", () => {
        const result = getCcySymbol("ABC");
        expect(result).toStrictEqual("");
      });
    });
  });
});
