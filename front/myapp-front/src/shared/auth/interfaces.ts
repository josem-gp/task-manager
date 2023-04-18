export interface UserAuthRequest {
  user: {
    username?: string;
    email: string;
    password: string;
  };
}
