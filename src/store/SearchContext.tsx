"use client";

import { createContext, useState, ReactNode } from "react";

// 1. Define context type
type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
};

// 2. Create context with default value
export const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
  clearSearchTerm: () => {},
});

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  function clearSearchTerm() {
    setSearchTerm("");
  }

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, clearSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
};
