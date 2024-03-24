import { formatPriceToCurrency } from "./currency";

describe("currency.ts", () => {
  test("should return a number with the correct format for US users", () => {
    const price = 14567.14;

    expect(formatPriceToCurrency(price, "US")).toBe("$14,567.14");
  });
});
