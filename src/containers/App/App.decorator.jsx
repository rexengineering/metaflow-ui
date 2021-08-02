import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import buildTheme from "../../theme";
import PropTypes from "prop-types";
import App from "./App";

function AppDecorator({ key }){
    const theme = buildTheme();
    return (
        <ThemeProvider key={key} theme={theme}>
            <App />
        </ThemeProvider>
    )
}

AppDecorator.propTypes= {
 key: PropTypes.string.isRequired,
}

export default AppDecorator;