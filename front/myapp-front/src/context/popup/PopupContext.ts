import { createContext } from "react";

type PopupContextType = {
  // We want the error to default to null value.
  // That way we can do the logic of showing the error when it holds any string value.
  popup: string | null;
  setPopup: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PopupContext = createContext({} as PopupContextType);
