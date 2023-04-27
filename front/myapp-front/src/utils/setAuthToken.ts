import Cookies from "js-cookie";

export function setAuthToken(response: string) {
  Cookies.set("auth_token", response, {
    expires: 7, // number of days until the cookie expires
    secure: true, // set the secure flag to true for HTTPS-only cookies
    httpOnly: false, // set the HttpOnly flag to true to prevent XSS attacks (this makes it so that it is not saved in dev)
  });
}

export function removeAuthToken() {
  Cookies.remove("auth_token");
}
