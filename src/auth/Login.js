import { Button } from "@material-ui/core";
import React from "react";
import "./auth.css";

function Login({ signIn, loginRef }) {
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />

        <div>
          <div>
            <form ref={loginRef}>
              <div className="inputs_parent">
                <input placeholder="Username" id="username" />
                <input placeholder="Password" id="password" />
              </div>

              <Button onClick={signIn}>Sign in</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
