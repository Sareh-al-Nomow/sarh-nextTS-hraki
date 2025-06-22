export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);

    if (!res.ok) {
      console.error("❌ Failed to fetch currency rates:", res.status);
      return amount;
    }

    const data = await res.json();

    if (data.result !== "success" || typeof data.rates !== "object") {
      console.error("❌ Invalid response structure:", data);
      return amount;
    }

    const rate = data.rates[to];

    if (typeof rate !== "number" || isNaN(rate)) {
      console.warn(
        `⚠️ Currency '${to}' is not supported. Using default amount.`
      );
      return amount;
    }

    return amount * rate;
  } catch (error) {
    console.error("❌ Error converting currency:", error);
    return amount;
  }
}
