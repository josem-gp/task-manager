export type ActionModalProps = BaseModal & CardModalProps;

type BaseModal = {
  btnName: string;
  type: "task" | "group" | "invitation" | "tag";
};

export type CardModalProps = {
  action: "show" | "create" | "edit";
};

export type ActionModalHeaderProps = {
  title: string;
  isShow: boolean;
  setFormAction: React.Dispatch<
    React.SetStateAction<"show" | "create" | "edit">
  >;
};
