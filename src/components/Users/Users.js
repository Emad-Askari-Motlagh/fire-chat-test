import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./styles.css";
import useAuth from "../../hooks/useAuth";
import { useStateValue } from "../../StateProvider";
import db from "../../firebase";
import Button from "../Button";

function Users() {
  const [users, setUsers] = useState([]);
  const { getAllUsers } = useAuth();
  const [{ user: currentUser }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchUsers() {
      const res = await getAllUsers();
      if (Array.isArray(res) && currentUser?.email) {
        setUsers([
          ...res.filter((ress) => ress.username !== currentUser.email),
        ]);
      }
    }
    fetchUsers();
  }, [currentUser]);

  async function handleClick(uid) {
    const fetchedRoomId = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("chats")
      .doc(uid)
      .get({ roomId: `${currentUser.uid},${uid}` });

    if (fetchedRoomId.exists) {
      window.location.href = `/${fetchedRoomId.data().roomId}`;
    } else {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("chats")
        .doc(uid)
        .set({ roomId: `${currentUser.uid},${uid}` });

      await db
        .collection("users")
        .doc(uid)
        .collection("chats")
        .doc(currentUser.uid)
        .set({ roomId: `${currentUser.uid},${uid}` });
      window.location.href = `/${currentUser.uid},${uid}`;
    }
  }
  return (
    <div className="users_container">
      {users?.length
        ? users.map((res) => {
            return (
              <div className="user_parent" key={res.uid}>
                <div className="first_row">
                  <div className="user_avatar">
                    <Avatar
                      src={`https://avatars.dicebear.com/api/human/${res.uid}.svg`}
                    />
                  </div>
                  <div className="info">
                    <div>
                      <label>User:</label>
                      <h3>{res.username}</h3>
                    </div>
                    <div>
                      <label>UserId:</label>
                      <p className="user_id">{res.uid}</p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleClick(res.uid)}>Chat Now</Button>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Users;
