import { createContext } from "react";

type ErrorContextType = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ErrorContext = createContext({} as ErrorContextType);
