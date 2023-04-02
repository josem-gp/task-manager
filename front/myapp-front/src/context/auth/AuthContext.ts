import { createContext } from "react";

type AuthContextType = {
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext({} as AuthContextType);
