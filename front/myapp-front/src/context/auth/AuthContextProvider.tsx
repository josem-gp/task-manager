import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [auth, setAuth] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function fetchAuthToken() {
    try {
      const token = Cookies.get("auth_token") || null;

      setAuth(token);
    } catch (error) {
      setError("Error fetching auth token from cookie");
    }
  }

  useEffect(() => {
    fetchAuthToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
