import { useContext } from "react";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { UserContext } from "../../context/user/UserContext";
import { PopupContext } from "../../context/popup/PopupContext";
import { fetchDataProps, handleAxiosCallProps } from "./useAxios.types";
import { CustomAxiosError } from "../../shared/general/interfaces";

// Reusable generic function that calls the API using Axios.
// If the response is an error it updates the state
// If the response is 200, it returns it and we will be doing the state update separately
export default function useAxios() {
  const { state: userState } = useContext(UserContext);
  const { setPopup } = useContext(PopupContext);

  function handleAxiosCall<T, U>({
    method,
    url,
    data,
    needAuth,
    withCredentials,
  }: handleAxiosCallProps<T>) {
    const params: fetchDataProps<T> = {
      method: method,
      url: url,
      data: data,
      withCredentials: withCredentials ? true : false,
      ...(needAuth
        ? {
            headers: {
              Authorization: `Bearer ${userState.userAuth}`,
              "Content-Type": "application/json",
            } as AxiosRequestHeaders,
          }
        : {}),
    };

    return axios(params)
      .then((response: AxiosResponse<U>) => {
        return response;
      })
      .catch((error: CustomAxiosError) => {
        if (typeof error.response.data === "string") {
          setPopup({
            message: error.response.data,
            type: "error",
          });
        } else {
          setPopup({
            message: error.response.data.message,
            type: "error",
          });
        }
      });
  }

  return { handleAxiosCall };
}
