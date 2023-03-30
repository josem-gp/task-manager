import axios, { AxiosError, AxiosResponse } from "axios";
import { UseApiProps } from "../types/types";

export function fetchData<T, R>(
  params: UseApiProps<T>
): Promise<AxiosResponse<R> | AxiosError> {
  return axios(params)
    .then((response: AxiosResponse<R>) => {
      return response;
    })
    .catch((error: AxiosError) => {
      return error;
    });
}
