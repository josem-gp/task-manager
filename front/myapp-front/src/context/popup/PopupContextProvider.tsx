import React, { useState } from "react";
import { PopupContext } from "./PopupContext";

type PopupContextProviderProps = {
  children: React.ReactNode;
};

function PopupContextProvider({ children }: PopupContextProviderProps) {
  const [popup, setPopup] = useState<string | null>(null);

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContextProvider;
