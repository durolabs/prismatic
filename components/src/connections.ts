import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const linearOAuthConnection = oauth2Connection({
  key: "linearOAuthConnection",
  label: "Linear OAuth 2.0 Connection",
  comments: "Authenticate requests to Linear",
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "OAuth 2.0 Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://linear.app/oauth/authorize?actor=application",
    },
    tokenUrl: {
      label: "OAuth 2.0 Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.linear.app/oauth/token",
    },
    scopes: {
      label: "OAuth 2.0 Scopes",
      type: "string",
      required: true,
      shown: true,
      default: "read write issues:create comments:create",
    },
    clientId: {
      label: "OAuth 2.0 Client ID",
      type: "string",
      required: true,
      comments: "A client ID obtained from Linear support",
    },
    clientSecret: {
      label: "OAuth 2.0 Client Secret",
      type: "password",
      required: true,
      comments: "A client secret obtained from Linear support",
    },
  },
});

export default [linearOAuthConnection];
