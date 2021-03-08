import getTypographyTheme from "./typography";

const { createMuiTheme } = require("@material-ui/core");

const buildTheme = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Avenir",
    },
  });
  const typographyTheme = getTypographyTheme(theme);
  theme.typography = { ...theme.typography, ...typographyTheme };
  return theme;
};

export default buildTheme;
