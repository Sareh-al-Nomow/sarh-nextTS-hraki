"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { convertCurrency } from "@/lib/currencySettings/convert-currency";
import {
  getSavedUserCurrency,
  saveUserCurrency,
} from "@/utils/currencyStorage";

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

type Props = {
  userIpCurrency: string;
  defaultSettingCurrrency: string;
  children: ReactNode;
};

export default function CurrencyProvider({
  userIpCurrency,
  defaultSettingCurrrency,
  children,
}: Props) {
  const [userCurrency, setUserCurrency] = useState(userIpCurrency);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const saved = getSavedUserCurrency();
    if (saved) {
      setUserCurrency(saved);
    }
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const rate = await convertCurrency(
          1,
          defaultSettingCurrrency,
          userCurrency
        );
        setRate(rate);
      } catch (err) {
        console.error("Error converting currency:", err);
      }
    };

    fetchRate();
  }, [defaultSettingCurrrency, userCurrency]);

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
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
