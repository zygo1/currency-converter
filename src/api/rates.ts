const API = "https://api.frankfurter.dev/v2/rates";

type Rate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type Rates = Rate[];

type RatesSnapshot = {
  base: string;
  rates: Record<string, { rate: number; date: string }>; // { AED:{ rate: 4.2343, date: 08-09-2026}, GDP:{ rate: 0.8724, date: 08-09-2026 }, JPY:{rate: 182.63, date: 08-09-2026}, ... }
};

export async function getRates(): Promise<RatesSnapshot> {
  const url = new URL(API);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch the data.`);
  }

  const data = (await response.json()) as Rates;

  if (data.length === 0) throw new Error("No rates returned");
  const rates: RatesSnapshot["rates"] = {};
  for (const rate of data) {
    rates[rate.quote] = { rate: rate.rate, date: rate.date };
  }

  return {
    base: data[0].base,
    rates,
  };
}
