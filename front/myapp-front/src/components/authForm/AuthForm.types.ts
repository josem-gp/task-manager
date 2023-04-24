export type AuthFormProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AuthFormSignupProps = {
  email?: string | null;
} & AuthFormProps;
