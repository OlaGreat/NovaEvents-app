import { describe, it, expect } from "vitest";
import { formatEventDate, calculateFundingProgress } from "./eventFormatting";

describe("formatEventDate", () => {
  it("formats a unix timestamp as a short US date", () => {
    expect(formatEventDate(1_750_000_000)).toBe("Jun 15, 2025");
  });
});

describe("calculateFundingProgress", () => {
  it("returns the percentage of the funding goal raised so far", () => {
    expect(calculateFundingProgress("50000000", "100000000")).toBe(50);
  });

  it("rounds to the nearest whole percent", () => {
    expect(calculateFundingProgress("1", "3")).toBe(33);
  });

  it("caps progress at 100 when balance exceeds the funding goal", () => {
    expect(calculateFundingProgress("150000000", "100000000")).toBe(100);
  });

  it("returns 0 when nothing has been raised yet", () => {
    expect(calculateFundingProgress("0", "100000000")).toBe(0);
  });
});
