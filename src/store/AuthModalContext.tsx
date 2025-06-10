"use client";

import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const AuthModalContext = createContext<AuthContextType>({
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

interface AuthProviderProp {
  children: ReactNode;
}

export const AuthModalProvider: FC<AuthProviderProp> = ({
  children,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {}, []);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
