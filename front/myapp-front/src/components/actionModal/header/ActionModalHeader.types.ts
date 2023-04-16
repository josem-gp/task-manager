import { DeleteAlertDialogProps } from "../alertDialog/delete/DeleteAlertDialog.types";

export type ActionModalHeaderProps = {
  title: string;
  isShow: boolean;
  setFormAction: React.Dispatch<
    React.SetStateAction<"show" | "create" | "edit">
  >;
} & DeleteAlertDialogProps;
