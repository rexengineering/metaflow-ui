import React from "react";
import ReactDOM from "react-dom";
import "./theme/fonts/avenir-font.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import buildTheme from "./theme";
import getStore from "./store";
import App from "./containers/App";

const theme = buildTheme();
const store = getStore({});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
