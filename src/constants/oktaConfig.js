import ENV from "../utils/env";

const config = {
  oidc: {
    clientId: ENV.OKTA.CLIENT_ID,
    issuer: ENV.OKTA.ISSUER,
    redirectUri: ENV.OKTA.REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: ENV.OKTA.OKTA_TESTING_DISABLEHTTPSCHECK,
  },
};

export default config;
