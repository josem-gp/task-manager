import { useReducer } from "react";
import { GroupContext, initialState, reducer } from "./GroupContext";

type GroupContextProviderProps = {
  children: React.ReactNode;
};

function GroupContextProvider({ children }: GroupContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GroupContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextProvider;
