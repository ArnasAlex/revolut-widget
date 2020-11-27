import { AppState, reducer } from "./AppContext";

describe("AppContext", () => {
  describe("reducer", () => {
    function createState(partial: Partial<AppState> = {}): AppState {
      return {
        accounts: [
          { ccy: "EUR", amount: "100" },
          { ccy: "USD", amount: "200" },
          { ccy: "GBP", amount: "300" },
        ],
        baseAccountIdx: 0,
        quoteAccountIdx: 1,
        baseAmount: "",
        quoteAmount: "",
        baseActive: true,
        rate: "2",
        ...partial,
      };
    }

    it("handles RateChanged action correctly when base account is active", () => {
      const state = createState({
        rate: "1.1",
        baseActive: true,
        baseAmount: "10",
        quoteAmount: "13",
      });

      const result = reducer(state, {
        type: "RateChanged",
        payload: { rate: "2" },
      });

      expect(result).toStrictEqual({
        ...state,
        rate: "2",
        quoteAmount: "20",
      });
    });

    it("handles RateChanged action correctly when quote account is active", () => {
      const state = createState({
        rate: "1.1",
        baseActive: false,
        baseAmount: "10",
        quoteAmount: "13",
      });

      const result = reducer(state, {
        type: "RateChanged",
        payload: { rate: "2" },
      });

      expect(result).toStrictEqual({
        ...state,
        rate: "2",
        baseAmount: "6.5",
      });
    });

    it("handles BaseAccountChanged action correctly when next is true", () => {
      const state = createState({
        baseAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "BaseAccountChanged",
        payload: { next: true },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAccountIdx: 2,
        rate: "0",
      });
    });

    it("handles BaseAccountChanged action correctly when next is undefined (means previous)", () => {
      const state = createState({
        baseAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "BaseAccountChanged",
        payload: {},
      });

      expect(result).toStrictEqual({
        ...state,
        baseAccountIdx: 0,
        rate: "0",
      });
    });

    it("handles QuoteAccountChanged action correctly when next is true", () => {
      const state = createState({
        quoteAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "QuoteAccountChanged",
        payload: { next: true },
      });

      expect(result).toStrictEqual({
        ...state,
        quoteAccountIdx: 2,
        rate: "0",
      });
    });

    it("handles QuoteAccountChanged action correctly when next is undefined (means previous)", () => {
      const state = createState({
        quoteAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "QuoteAccountChanged",
        payload: {},
      });

      expect(result).toStrictEqual({
        ...state,
        quoteAccountIdx: 0,
        rate: "0",
      });
    });

    it("handles BaseAmountChanged action correctly", () => {
      const state = createState({
        baseAmount: "7",
        quoteAmount: "13",
        rate: "2",
        baseActive: false,
      });

      const result = reducer(state, {
        type: "BaseAmountChanged",
        payload: { amount: "10" },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAmount: "10",
        quoteAmount: "20",
        baseActive: true,
      });
    });

    it("handles QuoteAmountChanged action correctly", () => {
      const state = createState({
        baseAmount: "7",
        quoteAmount: "13",
        rate: "2",
      });

      const result = reducer(state, {
        type: "QuoteAmountChanged",
        payload: { amount: "10" },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAmount: "5",
        quoteAmount: "10",
        baseActive: false,
      });
    });

    it("handles Exchange action correctly", () => {
      const state = createState({
        baseAmount: "10",
        quoteAmount: "20",
      });

      const result = reducer(state, {
        type: "Exchange",
        payload: {},
      });

      expect(result).toStrictEqual({
        ...state,
        accounts: [
          { ccy: "EUR", amount: "90" },
          { ccy: "USD", amount: "220" },
          { ccy: "GBP", amount: "300" },
        ],
        baseAmount: "",
        quoteAmount: "",
      });
    });
  });
});
