import React from "react";
import "./styles.css";

export default function Button({ children, onClick, type }) {
  return (
    <div className="button_container">
      <button onClick={onClick} type={type} className="button-43" role="button">
        {children}
      </button>
    </div>
  );
}
