import axios, { AxiosError } from "axios";

import React, { useState } from "react";
import "./MainView.css";

const otp_url = "https://mykobold.eu.auth0.com/passwordless/start";
function otp_request_payload(email: string): string {
  return `{
  "send": "code",
  "email": ${email},
  "client_id": "KY4YbVAvtgB7lp8vIbWQ7zLk3hssZlhR",
  "connection": "email"
}`;
}

function MainView() {
  const [email, setEmail] = useState("");
  const [otpResponse, setOtpResponse] = useState("");
  const [otpError, setOtpError] = useState<AxiosError | null>(null);

  // const [otpResponse, setOtpResponse] = useState("");

  async function make_otp_request(email: string) {
    try {
      const res = await axios.post(otp_url, otp_request_payload(email), {
        headers: { "Content-Type": "application/json" },
      });
      setOtpResponse(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setOtpError(err);
        console.log(err);
      } else {
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <h2>Get OTP Value</h2>
      Request a one-time password (OTP) for your Vorwerk Account email. You will
      need the OTP in the next step to request a Token.
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");
          make_otp_request(email);
        }}
      >
        <p className="emailBox">
          <label>Your e-mail address</label>
          <br />
          <input
            id="emailAddress"
            type="email"
            required
            placeholder="username@email.com"
            title="The email address of your Vorwerk account"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </p>

        <div className="otpRequest">
          <label style={{ fontSize: "small" }}>
            The json request sent to {otp_url}:
          </label>
          <br />
          <div className="json">{otp_request_payload(email)}</div>
        </div>

        <input type="submit" value="Request email with otp value" />

        <div className="otpResponse">
          {otpResponse && (
            <div>
              <label>You should have received an email with your OTP. Server json response was </label>
              <div className="json">{otpResponse}</div>
            </div>
          )}
          {otpError && (
            <div>
              <label>Response Error</label>
              <div className="json error">{otpError.message}</div>
            </div>
          )}
        </div>
      </form>

      <h2>Get Token</h2>
      Obtain a Token based on your OTP received in the previous step per email.
    </div>
  );
}

export default MainView;
