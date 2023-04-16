import { createContext } from "react";

type PopupContextType = {
  // We want the error to default to null value.
  // That way we can do the logic of showing the error when it holds any string value.
  popup: {
    message: string | null;
    type: "error" | "success";
  };
  setPopup: React.Dispatch<
    React.SetStateAction<{
      message: string | null;
      type: "error" | "success";
    }>
  >;
};

export const PopupContext = createContext({} as PopupContextType);
