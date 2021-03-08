const getTypographyTheme = (theme) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    subtitle1,
    subtitle2,
    body1,
    body2,
    caption,
    button,
    overline,
  } = theme.typography;
  return {
    h1: {
      ...h1,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(6),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(6.75),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(6.75),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(9),
      },
    },
    h2: {
      ...h2,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(6),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(6),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(7),
      },
    },
    h3: {
      ...h3,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(5),
      },
    },
    h4: {
      ...h4,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2.5),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(4),
      },
    },
    h5: {
      ...h5,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(2.5),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(2.5),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(3),
      },
    },
    h6: {
      ...h6,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2.5),
      },
    },
    subtitle1: {
      ...subtitle1,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2.5),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(4),
      },
    },
    subtitle2: {
      ...subtitle2,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2.5),
      },
    },
    body1: {
      ...body1,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(2.25),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2.5),
      },
      fontWeight: 700,
    },
    body2: {
      ...body2,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(2),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(2),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2.25),
      },
      fontWeight: 700,
    },
    caption: {
      ...caption,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(1.75),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(1.75),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(1.75),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2),
      },
      fontWeight: 700,
    },
    button: {
      ...button,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(1.5),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(1.75),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(1.75),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(2),
      },
      letterSpacing: "1.25px",
    },
    overline: {
      ...overline,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(1.5),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(1.5),
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.spacing(1.5),
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: theme.spacing(1.75),
      },
      fontWeight: 700,
    },
  };
};
export default getTypographyTheme;
