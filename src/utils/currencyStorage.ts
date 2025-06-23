// utils/currencyStorage.ts
export function saveUserCurrency(currency: string) {
  localStorage.setItem("userCurrency", currency);
}

export function getSavedUserCurrency(): string | null {
  return localStorage.getItem("userCurrency");
}
