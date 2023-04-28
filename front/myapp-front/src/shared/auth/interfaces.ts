export interface UserAuthRequest {
  user: {
    username?: string;
    email: string;
    password: string;
    groups_as_admin_attributes?: [
      {
        name: string;
      }
    ];
  };
}
