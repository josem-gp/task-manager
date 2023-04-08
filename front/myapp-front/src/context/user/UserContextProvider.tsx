import { useContext, useEffect, useReducer } from "react";
import { UserContext, initialState, reducer } from "./UserContext";
import Cookies from "js-cookie";
import { ErrorContext } from "../error/ErrorContext";

type UserContextProviderProps = {
  children: React.ReactNode;
};

function UserContextProvider({ children }: UserContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, setError } = useContext(ErrorContext);

  function fetchAuthToken() {
    try {
      const token = Cookies.get("auth_token") || null;
      // To set the token in the context
      dispatch({ type: "SET_USER_AUTH", payload: token });
    } catch (error) {
      setError("Error fetching auth token from cookie");
    }
  }

  useEffect(() => {
    fetchAuthToken();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
