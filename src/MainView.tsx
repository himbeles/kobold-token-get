import axios, { AxiosError } from "axios";

import React, { useState } from "react";
import "./MainView.css";
import { otp_url, otp_request_payload , OtpPayload} from "./api"
import { ipcRenderer } from 'electron'
//const ipcRenderer = window.icpRenderer

function format(o: any) : string {
  return JSON.stringify(o, null, 1)
}

function MainView() {
  const [email, setEmail] = useState("");
  const [otpResponse, setOtpResponse] = useState<OtpPayload | null>(null);
  const [otpError, setOtpError] = useState<AxiosError | null>(null);
  const [otpLoading, setOtpLoading] = useState(false)

  // const [otpResponse, setOtpResponse] = useState("");

  async function make_otp_request(email: string) {
    setOtpResponse(null)
    setOtpError(null)
    setOtpLoading(true)
    try {
        const res = await ipcRenderer.invoke('otp', {email: email})
        if (res["data"]) { setOtpResponse(res["data"]) }
        if (res["error"]) { setOtpError(res["error"]) }
    } catch (err) {
      console.warn(err);
    }
    setOtpLoading(false)
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
            The json request which will be sent to {otp_url}:
          </label>
          <br />
          <div className="json neutral">{format(otp_request_payload(email))}</div>
        </div>

        <input type="submit" value="Request OTP email from Vorwerk" />

        

        <div className="otpResponse">
          {otpLoading ?? <progress />}
          {otpResponse && (
            <div>
              <label><span className="success">You should have received an email with your OTP.</span> Server json response was </label>
              <div className="json success">{format(otpResponse)}</div>
            </div>
          )}
          {otpError && (
            <div>
              <label><span className="error">There was an error while sending the OTP request.</span></label>
              <div className="json error">{otpError && (otpError.message ?? "")}</div>
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
