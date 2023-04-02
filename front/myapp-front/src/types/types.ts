import { AxiosRequestHeaders } from "axios";

export type UseApiProps<T> = {
  method: "post" | "get" | "patch" | "delete";
  url: string;
  data?: T;
  headers?: AxiosRequestHeaders;
};
