export const otp_url = "https://mykobold.eu.auth0.com/passwordless/start";
export const token_url = "https://mykobold.eu.auth0.com/oauth/token";

export function otp_request_payload(email: string) {
  return {
    send: "code",
    email: email,
    client_id: "KY4YbVAvtgB7lp8vIbWQ7zLk3hssZlhR",
    connection: "email",
  };
}

export function token_request_payload(otp: string, email: string) {
  return {
    prompt: "login",
    grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
    scope: "openid email profile read:current_user",
    locale: "en",
    otp: otp,
    source: "vorwerk_auth0",
    platform: "ios",
    audience: "https://mykobold.eu.auth0.com/userinfo",
    username: email,
    client_id: "KY4YbVAvtgB7lp8vIbWQ7zLk3hssZlhR",
    realm: "email",
    country_code: "DE",
  };
}

export declare interface TokenResponse {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}
