const config = {
  oidc: {
    clientId: window.REX.OKTA.CLIENT_ID,
    issuer: window.REX.OKTA.ISSUER,
    redirectUri: window.REX.OKTA.REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: window.REX.OKTA.OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: "http://localhost:5000/api/messages",
  },
};

export default config;
