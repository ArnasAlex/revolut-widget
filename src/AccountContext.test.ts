import { AccountData, reducer } from "./AccountContext";

describe("AccountContext", () => {
  describe("reducer", () => {
    it("handles Convert action correctly", () => {
      const accounts: AccountData[] = [
        { ccy: "GBP", amount: "100" },
        { ccy: "EUR", amount: "200" },
      ];

      const result = reducer(accounts, {
        type: "Convert",
        payload: {
          base: { ccy: "GBP", amount: "10" },
          quote: { ccy: "EUR", amount: "20" },
        },
      });

      expect(result.length).toStrictEqual(2);
      expect(result).toStrictEqual([
        { ccy: "GBP", amount: "90" },
        { ccy: "EUR", amount: "220" },
      ]);
    });
  });
});
