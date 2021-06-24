(function env(window) {
  window.REX = window.REX || {};

  window.REX.OKTA = window.REX.OKTA || {};
  window.REX.OKTA.CLIENT_ID = "0oa3l15id2wXRWdcQ4x7";
  window.REX.OKTA.ISSUER = "https://dev-882393.okta.com/oauth2/default";
  window.REX.OKTA.OKTA_TESTING_DISABLEHTTPSCHECK = true;
  window.REX.OKTA.REDIRECT_URI = `${window.location.origin}/login/callback`;

  window.REX.SERVICES = window.REX.SERVICES || {};
  window.REX.SERVICES.PRISM_API = "http://localhost:8000/query/";
}(this));
