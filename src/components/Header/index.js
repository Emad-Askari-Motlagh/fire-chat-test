import React from "react";
import Button from "../Button";
import { Home } from "@mui/icons-material";
import "./styles.css";
import Link from "../Link";
import { Avatar } from "@mui/material";

export default function Header({ user, signOut }) {
  return (
    <div className="header_container">
      <div className="name_parent">
        <Avatar src={`https://avatars.dicebear.com/api/human/${2}.svg`} />
        <span>{user ?? `_`}</span>
      </div>

      <Link href="/">
        <Home />
      </Link>
      <button
        className="button-5"
        role="button"
        onClick={user ? signOut : () => (window.location.href = "/auth/login")}>
        {user ? "SignOut" : "Login"}
      </button>
    </div>
  );
}
