export const otp_url = "https://mykobold.eu.auth0.com/passwordless/start";
export const token_url = "https://mykobold.eu.auth0.com/oauth/token";

export declare interface OtpPayload {
  send: string;
  email: string;
  client_id: string;
  connection: string;
}

export function otp_request_payload(email: string): OtpPayload {
  return {
    send: "code",
    email: email,
    client_id: "KY4YbVAvtgB7lp8vIbWQ7zLk3hssZlhR",
    connection: "email",
  };
}

export declare interface TokenPayload {
  prompt: string;
  grant_type: string;
  scope: string;
  locale: string;
  otp: string;
  source: string;
  platform: string;
  audience: string;
  username: string;
  client_id: string;
  realm: string;
  country_code: string;
}

export function token_request_payload(
  otp: string,
  email: string
): TokenPayload {
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
