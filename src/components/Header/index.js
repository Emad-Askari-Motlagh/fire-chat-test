import React from "react";
import "./styles.css";

export default function Header({ user, signOut }) {
  return (
    <div className="header_container">
      <span>{user ?? `_`}</span>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
}
