import Button from "../components/Button";
import React from "react";
import "./auth.css";
import Link from "../components/Link";

function Login({ signIn, loginRef }) {
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_text">
          <h1>LogIn</h1>
        </div>
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
          <div>
            <a href="/auth/signup">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
