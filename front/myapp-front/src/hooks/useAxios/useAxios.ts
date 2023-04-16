import { useContext } from "react";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { UserContext } from "../../context/user/UserContext";
import { PopupContext } from "../../context/popup/PopupContext";
import { fetchDataProps, handleAxiosCallProps } from "./useAxios.types";

// Reusable generic function that calls the API using Axios.
// If the response is an error it updates the state
// If the response is 200, it returns it and we will be doing the state update separately
export default function useAxios() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { popup, setPopup } = useContext(PopupContext);

  function fetchData<T, R>(
    params: fetchDataProps<T>
  ): Promise<AxiosResponse<R> | AxiosError> {
    return axios(params)
      .then((response: AxiosResponse<R>) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return error;
      });
  }

  function handleAxiosCall<T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) {
    const params: fetchDataProps<T> = {
      method: method,
      url: url,
      data: data,
      ...(needAuth
        ? {
            headers: {
              Authorization: `Bearer ${userState.userAuth}`,
              "Content-Type": "application/json",
            } as AxiosRequestHeaders,
          }
        : {}),
    };

    return fetchData<T, U>(params)
      .then((response: AxiosResponse<U> | AxiosError) => {
        if ("data" in response) {
          return response;
        } else {
          setPopup(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        setPopup(error.response?.data as React.SetStateAction<string | null>);
      });
  }

  return { handleAxiosCall };
}
