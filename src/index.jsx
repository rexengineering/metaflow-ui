import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./theme/fonts/avenir-font.css";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import buildTheme from "./theme";

const theme = buildTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
