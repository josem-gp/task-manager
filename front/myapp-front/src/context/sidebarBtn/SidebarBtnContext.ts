import { createContext } from "react";
import { SidebarBtn } from "../../views/sidebar/Sidebar.types";

type SidebarBtnContextType = {
  sidebarBtns: SidebarBtn[];
  setSidebarBtns: React.Dispatch<React.SetStateAction<SidebarBtn[]>>;
  selectedGroupId: string;
  setSelectedGroupId: React.Dispatch<React.SetStateAction<string>>;
};

export const SidebarBtnContext = createContext({} as SidebarBtnContextType);
