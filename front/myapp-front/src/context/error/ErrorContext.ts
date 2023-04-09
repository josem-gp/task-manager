import { createContext } from "react";

type ErrorContextType = {
  // We want the error to default to null value.
  // That way we can do the logic of showing the error when it holds any string value.
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ErrorContext = createContext({} as ErrorContextType);
