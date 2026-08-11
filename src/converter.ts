import { RatesSnapshot } from "./api/rates";
import { CurrencyCode } from "./currencies";

export function converter(
  snapshot: RatesSnapshot,
  from: CurrencyCode,
  to: CurrencyCode,
  amount: number,
) {
  const fromEntry = snapshot.rates[from];
  const toEntry = snapshot.rates[to];

  if (!fromEntry || !toEntry) {
    throw new Error(`Rate not available for ${from} or ${to}`);
  }

  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid amount: ${amount}`);
  }

  const rate = toEntry.rate / fromEntry.rate;

  const oldestDate =
    fromEntry.date < toEntry.date ? fromEntry.date : toEntry.date;

  return { rate, result: rate * amount, asOf: oldestDate };
}
