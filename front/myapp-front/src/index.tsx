import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PopupContextProvider from "./context/popup/PopupContextProvider";
import { theme, ThemeProvider } from "./assets/theme/ThemeProvider";
import UserContextProvider from "./context/user/UserContextProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <PopupContextProvider>
          <RouterProvider router={router} />
        </PopupContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
