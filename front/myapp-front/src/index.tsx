import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorContextProvider from "./context/error/ErrorContextProvider";
import { theme, ThemeProvider } from "./assets/theme/ThemeProvider";
import UserContextProvider from "./context/user/UserContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <ErrorContextProvider>
          <App />
        </ErrorContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
