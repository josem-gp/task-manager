export interface GenericMessageResponse {
  message: string;
}

export type CustomAxiosError =
  | CustomAxiosErrorWithStringData
  | CustomAxiosErrorWithMessageString;

export interface CustomAxiosErrorWithStringData {
  response: {
    data: string;
  };
}

export interface CustomAxiosErrorWithMessageString {
  response: {
    data: {
      message: string;
    };
  };
}
