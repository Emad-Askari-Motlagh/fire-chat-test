import Button from "../components/Button";
import React from "react";
import "./auth.css";
import Link from "../components/Link";

function Login({ signIn, loginRef }) {
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_text">
          <h2>LogIn</h2>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />

        <div>
          <div>
            <form ref={loginRef}>
              <div className="inputs_parent">
                <input
                  autoCapitalize="false"
                  autoCorrect="false"
                  placeholder="Username"
                  id="username"
                />
                <input
                  autoCapitalize="false"
                  autoCorrect="false"
                  placeholder="Password"
                  id="password"
                />
              </div>

              <Button type="submit" onClick={signIn}>
                Sign in
              </Button>
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
