export function formatEventDate(dateUnix: number): string {
  return new Date(dateUnix * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateFundingProgress(
  balance: string,
  fundingGoal: string
): number {
  return Math.min(100, Math.round((Number(balance) / Number(fundingGoal)) * 100));
}
