import React, { useState, useEffect } from "react";

import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import useAuth from "../../hooks/useAuth";

function Users() {
  const [users, setUsers] = useState([]);
  const { getAllUsers } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      const res = await getAllUsers();
      setUsers([...res]);
    }
    fetchUsers();
  }, []);

  return (
    <div className="chat">
      {users.map((res) => {
        return (
          <div key={res.uid}>
            <h3>{res.username}</h3>
            <p>{res.uid}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
