import { Button } from "@material-ui/core";
import React from "react";
import "./auth.css";

function SignUp({ signUp, signUpRef }) {
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign Up to Whatsapp</h1>
        </div>
        <div>
          <div>
            <form ref={signUpRef} className="form">
              <div className="inputs_parent">
                <input placeholder="Username" id="username" />
                <input placeholder="Password" id="password" />
              </div>

              <Button onClick={signUp}>Sign U</Button>
            </form>
          </div>
          <div>
            <a href="/auth/login">Do you already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
