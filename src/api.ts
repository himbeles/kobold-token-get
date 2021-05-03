export const otp_url = "https://mykobold.eu.auth0.com/passwordless/start";

export declare interface OtpPayload {
    send: string
    email: string
    client_id: string
    connection: string
}

export function otp_request_payload(email: string): OtpPayload {
  return {
    send: "code",
    email: email,
    client_id: "KY4YbVAvtgB7lp8vIbWQ7zLk3hssZlhR",
    connection: "email",
  };
}
