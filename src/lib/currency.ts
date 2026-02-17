/**
 * Exchange rates (approximate, for display purposes).
 * SAR and QAR are pegged to USD.
 */
export const SAR_TO_USD = 0.267; // ~3.75 SAR per 1 USD
export const QAR_TO_USD = 0.275; // ~3.64 QAR per 1 USD

/** Format USD equivalent from SAR amount */
export function sarToUsd(value: number): string {
  return formatUsdCompact(value * SAR_TO_USD);
}

/** Format USD equivalent from QAR amount */
export function qarToUsd(value: number): string {
  return formatUsdCompact(value * QAR_TO_USD);
}

function formatUsdCompact(usd: number): string {
  if (usd >= 1_000_000_000_000)
    return `$${(usd / 1_000_000_000_000).toFixed(1)}T`;
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(1)}B`;
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(2)}M`;
  if (usd >= 1_000) return `$${(usd / 1_000).toFixed(0)}K`;
  return `$${Math.round(usd).toLocaleString()}`;
}
