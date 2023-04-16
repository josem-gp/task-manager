import { AxiosRequestHeaders } from "axios";

type baseAxiosProps<T> = {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  data?: T;
};

export type fetchDataProps<T> = {
  headers?: AxiosRequestHeaders;
} & baseAxiosProps<T>;

export type handleAxiosCallProps<T> = {
  needAuth: boolean;
} & baseAxiosProps<T>;
