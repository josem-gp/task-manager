import { createContext } from "react";
import { SidebarBtn } from "../../views/sidebar/Sidebar.types";

type SidebarBtnContextType = {
  sidebarBtns: SidebarBtn[];
  setSidebarBtns: React.Dispatch<React.SetStateAction<SidebarBtn[]>>;
};

export const SidebarBtnContext = createContext({} as SidebarBtnContextType);
