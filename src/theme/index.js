import getTypographyTheme from "./typography";
import { createMuiTheme } from "@material-ui/core";

const buildTheme = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Avenir",
    },
    palette: {
      primary: {
        main: "#FF685F",
        light: "#FF8B84",
        dark: "#E65E55",
        contrastText: "#FFF",
      },
      secondary: {
        main: "#807DFB",
        light: "#DAE0F5",
      },
      miscellaneous1: {
        main: "#FBAE41",
        light: "#FBAE41",
        dark: "#FBAE41",
        contrastText: "#FFFFFF",
      },
      miscellaneous2: {
        main: "#89C5CC",
        light: "#89C5CC",
        dark: "#89C5CC",
        contrastText: "#FFFFFF",
      },
      grey: {
        300: "#F2F2F2",
        400: "#BDBDBD",
        600: "#595959",
        700: "#595959",
        800: "#4F4F4F",
      },
      text: {
        primary: "#4F4F4F",
        secondary: "#828282",
        disabled: "#BDBDBD",
      },
      background: {
        default: "#F8F8F8",
        paper: "#FFFFFF",
      },
    },
  });
  const typographyTheme = getTypographyTheme(theme);
  theme.typography = { ...theme.typography, ...typographyTheme };
  return theme;
};

export default buildTheme;
