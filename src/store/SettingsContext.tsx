"use client";
import React, { createContext, useContext } from "react";
import type { Settings } from "@/models/forntEndSettings";

// إنشاء الـ context
const SettingsContext = createContext<Settings | null>(null);

// ✅ Provider
export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

// ✅ Hook للاستخدام داخل client components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside <SettingsProvider>");
  }
  return context;
}
