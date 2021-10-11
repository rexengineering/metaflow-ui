import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import buildTheme from "../../theme";
import PropTypes from "prop-types";
import App from "./App";

function AppDecorator({ keyValue }){
    const theme = buildTheme();
    return (
        <ThemeProvider key={keyValue} theme={theme}>
            <App />
        </ThemeProvider>
    )
}

AppDecorator.propTypes= {
    keyValue: PropTypes.string.isRequired,
}

export default AppDecorator;