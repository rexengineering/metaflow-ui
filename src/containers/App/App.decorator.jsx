import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import buildTheme from "../../theme";
import App from "./App";

function AppDecorator(){
    const theme = buildTheme();
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    )
}

export default AppDecorator;