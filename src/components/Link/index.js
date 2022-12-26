import React from "react";
import "./styles.css";

export default function Link({ children, href, type }) {
  return (
    <div className="button_container">
      <a href={href} type={type} className="button-77" role="button">
        {children}
      </a>
    </div>
  );
}
