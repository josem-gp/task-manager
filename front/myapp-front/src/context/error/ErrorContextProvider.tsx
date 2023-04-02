import React, { useState } from "react";
import { ErrorContext } from "./ErrorContext";

type ErrorContextProviderProps = {
  children: React.ReactNode;
};

function ErrorContextProvider({ children }: ErrorContextProviderProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContextProvider;
