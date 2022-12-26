import React, { useEffect, useState } from "react";
import db from "../firebase";

export default function useChat() {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  return {
    users,
  };
}
