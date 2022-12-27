import React, { useState, useEffect, useCallback, useRef } from "react";
import { Avatar } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { InsertEmoticon, Mic } from "@mui/icons-material";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db, { storage } from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import { encryptData, decryptData } from "../lib/crypto";
import Loading from "./Loading";
import Button from "./Button";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRoomAvailable, setIsRoomAvailable] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  const fileRef = useRef();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setRoomName(snapshot.data()?.name);
            setIsRoomAvailable(true);
          } else {
            setIsRoomAvailable(false);
            db.collection("rooms").doc(roomId).set({});
          }
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp")

        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.flatMap((doc) => [{ id: doc.id, data: doc.data() }])
          );
        });
      setLoading(false);
    }
  }, [roomId]);
  async function attachFile(e) {
    const fileSrc = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const tt = await storage.ref(`images/${file.name}`).put(file).snapshot;
      const url = await tt.ref.getDownloadURL();
      const name = tt.ref.name;

      await db.collection("rooms").doc(roomId).collection("messages").add({
        imageUrl: url,
        imageName: name,
        name: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const encryptedTest = encryptData(input);
    await db.collection("rooms").doc(roomId).collection("messages").add({
      message: encryptedTest,
      name: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  if (!isRoomAvailable) {
    return (
      <div className="warning">
        <div>OBS! There isn`t any room with this number</div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name">{roomName}</h3>
          <p className="chat-room-last-seen">
            {messages[messages?.length - 1]
              ? ` Last seen: ${new Date(
                  messages[messages?.length - 1]?.data?.timestamp?.toDate()
                ).toUTCString()}`
              : "No Message Yet"}
          </p>
        </div>
      </div>
      {loading && <Loading />}
      <div className="chat_body">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`chat_message ${
              message.data?.name === user?.email && "chat_receiver"
            }`}>
            <span
              className={`chat_name ${
                message.data?.name === user?.email && "chat_name_me"
              }`}>
              {message.data?.name === user?.email ? "Me" : message.data?.name}
            </span>
            {message.data?.message ? (
              decryptData(message.data?.message)
            ) : (
              <a
                download={message.data.imageName}
                href={message.data.imageUrl}
                title={message.data.imageName}>
                <img
                  onClick={(e) => (e.target.style.width = "400px")}
                  className="message_img"
                  src={message.data.imageUrl}
                  alt={message.data.imageName}></img>
              </a>
            )}

            <span className="chat_timestemp">
              {new Date(message.data?.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <label htmlFor="file">
            <AttachFile className="attach_icon" />
          </label>

          <input
            ref={fileRef}
            onChange={attachFile}
            className="attach_input"
            type="file"
            id="file"
          />
          <Button type="submit" onClick={sendMessage}>
            Send a Message
          </Button>
        </form>

        <Mic />
      </div>
    </div>
  );
}

export default Chat;
