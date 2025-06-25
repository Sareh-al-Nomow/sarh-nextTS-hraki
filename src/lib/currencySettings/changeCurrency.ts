// /lib/currencySettings/changeCurrency.ts
export async function fetchConversionRate(
  from: string,
  to: string
): Promise<number> {
  if (from === to) return 1;
  try {
    const res = await fetch(
      `https:/api.exchangerate.host/convert?from=${from}&to=${to}&amount=1`
    );
    const data = await res.json();
    const rate = Number(data.result);
    if (!rate || isNaN(rate)) throw new Error("Invalid rate");
    return rate;
  } catch (err) {
    console.error("❌ Error fetching conversion rate:", err);
    return 1;
  }
}
