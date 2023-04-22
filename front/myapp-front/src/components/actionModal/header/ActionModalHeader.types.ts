export type ActionModalHeaderProps = {
  title: string;
  isShow: boolean;
  setFormAction: React.Dispatch<
    React.SetStateAction<"show" | "create" | "edit">
  >;
  type: "task" | "tag";
  elementId?: number;
};
