"use client";

import {
  getSavedUserCurrency,
  saveUserCurrency,
} from "@/utils/currencyStorage";
import { createContext, useContext, useEffect, useState } from "react";

type CurrencyContextType = {
  userCurrency: string;
  rate: number;
  setUserCurrency: (currency: string) => void;
};

const defaultCurrencyContext: CurrencyContextType = {
  userCurrency: "USD",
  rate: 1,
  setUserCurrency: () => {},
};

export const CurrencyContext = createContext<CurrencyContextType>(
  defaultCurrencyContext
);

import React, { ReactNode } from "react";
type Props = {
  userCurrency: string;
  rate: number;
  children: ReactNode;
};

export default function CurrencyProvider({
  userCurrency: initialCurrency,
  rate,
  children,
}: Props) {
  const [userCurrency, setUserCurrency] = useState(initialCurrency);

  useEffect(() => {
    const saved = getSavedUserCurrency();
    if (saved) {
      setUserCurrency(saved);
    }
  }, []);

  const handleCurrencyChange = (currency: string) => {
    setUserCurrency(currency);
    saveUserCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{ userCurrency, rate, setUserCurrency: handleCurrencyChange }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrency must be used within a CurrencyContext.Provider"
    );
  }
  return context;
}
