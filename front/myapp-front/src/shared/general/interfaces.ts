export interface GenericMessageResponse {
  message: string;
}

export interface CustomAxiosError {
  response: {
    data: {
      message: string;
    };
  };
}
