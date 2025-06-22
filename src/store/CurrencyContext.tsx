"use client";

import { createContext, useContext } from "react";

type CurrencyContextType = {
  userCurrency: string;
  rate: number;
};

const defaultCurrencyContext: CurrencyContextType = {
  userCurrency: "USD",
  rate: 1,
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
  userCurrency,
  rate,
  children,
}: Props) {
  return (
    <CurrencyContext.Provider value={{ userCurrency, rate }}>
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
