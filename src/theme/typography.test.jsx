import { createMuiTheme } from "@material-ui/core";
import getTypographyTheme from "./typography";

describe("Typography theme", () => {
  it("should have responsive types keys", () => {
    const typographyTheme = getTypographyTheme(createMuiTheme());
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
    } = typographyTheme;
    const responsiveTypesKeys = [
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
    ];
    responsiveTypesKeys.forEach((currentKey) =>
      expect(currentKey).toBeTruthy()
    );
  });
});
