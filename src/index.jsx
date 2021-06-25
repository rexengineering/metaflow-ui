import React from "react";
import ReactDOM from "react-dom";
import "./theme/fonts/avenir-font.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import buildTheme from "./theme";
import getStore from "./store";
import CallerInfo from "./components/CallerInfo/Callerinfo";

const theme = buildTheme();
const store = getStore({});

/*
const talkTrack = [
  {
    identifier: "as345",
    title: "Intro",
    speech:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut est ipsum minus molestiae nesciunt obcaecati quo quos, repudiandae sed tempora voluptatem. Accusantium consequuntur dicta error obcaecati perspiciatis quisquam recusandae?",
    actions: ["Selling", "Buying", "Things", "IoT"],
    onInquirySelected: () => {},
    onSkip: () => {},
    active: true,
  },
  {
    identifier: "56htr4g5",
    title: "Conclude",
    speech:
      "Conclusion, consectetur adipisicing elit. Assumenda aut est ipsum minus molestiae nesciunt obcaecati quo quos, repudiandae sed tempora voluptatem. Accusantium consequuntur dicta error obcaecati perspiciatis quisquam recusandae?",
    actions: [],
    onInquirySelected: () => {},
    onSkip: () => {},
    active: false,
  },
];
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CallerInfo callerName="John Doe" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
