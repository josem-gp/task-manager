import React, { useEffect, useState } from "react";
import { PopupContext } from "./PopupContext";

type PopupContextProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  message: null as string | null,
  type: "success" as "error" | "success",
};

function PopupContextProvider({ children }: PopupContextProviderProps) {
  const [popup, setPopup] = useState(initialState);

  // We want to close the popup 2 seconds after it was opened if the user doesn't click on the close button
  useEffect(() => {
    if (popup.message !== null) {
      const timer = setTimeout(() => {
        setPopup((prevState) => ({ ...prevState, message: null }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popup.message]);

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContextProvider;
