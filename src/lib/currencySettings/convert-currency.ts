export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;

  try {
    // جلب أسعار العملات مقابل from (الأساسية)
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);

    if (!res.ok) {
      console.error("Failed to fetch rates:", res.status);
      return amount;
    }

    const data = await res.json();

    if (data.result !== "success" || !data.rates) {
      console.error("Invalid data from rates API:", data);
      return amount;
    }

    const rate = data.rates[to];

    if (!rate || typeof rate !== "number") {
      console.error(`Rate for currency ${to} not found`);
      return amount;
    }

    return amount * rate;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    return amount;
  }
}
