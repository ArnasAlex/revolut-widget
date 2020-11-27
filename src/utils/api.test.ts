import { getCcyRate, getCcyRateUrl } from "./api";

describe("utils", () => {
  describe("api", () => {
    describe("getCcyRateUrl", () => {
      it("returns api url with currencies as params", () => {
        const result = getCcyRateUrl("EUR", "USD");
        expect(result).toStrictEqual(
          "https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD"
        );
      });
    });

    describe("getCcyRate", () => {
      it("returns rate fetched from api", async () => {
        jest.spyOn(window, "fetch").mockResolvedValue({
          json: () => Promise.resolve({ rates: { USD: "1.3" } }),
        } as Response);

        const result = await getCcyRate("EUR", "USD");
        expect(result).toStrictEqual("1.3");
      });
    });
  });
});
