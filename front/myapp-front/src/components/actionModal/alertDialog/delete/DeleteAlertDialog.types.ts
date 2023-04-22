export type DeleteAlertDialogProps = {
  handleDelete: () => Promise<void>;
  type: "task" | "tag" | "user" | "invitation";
};
