import { useContext, useEffect, useReducer } from "react";
import { UserContext, initialState, reducer } from "./UserContext";
import Cookies from "js-cookie";
import { PopupContext } from "../popup/PopupContext";

type UserContextProviderProps = {
  children: React.ReactNode;
};

function UserContextProvider({ children }: UserContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setPopup } = useContext(PopupContext);

  function fetchAuthToken() {
    try {
      const token = Cookies.get("auth_token") || "";
      // To set the token in the context
      dispatch({ type: "SET_USER_AUTH", payload: token });
    } catch (error) {
      setPopup({
        message: "Error fetching auth token from cookie",
        type: "error",
      });
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
