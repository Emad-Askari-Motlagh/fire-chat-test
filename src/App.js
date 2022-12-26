import "./App.css";
import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import useAuth from "./hooks/useAuth";
import Header from "./components/Header";
import Users from "./components/Users/Users";

function App() {
  const [{ user }, dispatch] = useStateValue();

  const { signIn, signUp, loginRef, signUpRef, signOut } = useAuth();

  return (
    <div className="app">
      <Header user={user?.email} signOut={signOut}></Header>
      <div className="app_body">
        <BrowserRouter>
          <Routes>
            <Route path="/chat/rooms/:roomId" element={<Chat />}></Route>
            <Route
              path="/"
              element={
                <div style={{ width: "100vw" }}>
                  <Users />
                </div>
              }></Route>
            <Route
              path="/:roomId"
              element={
                <div style={{ width: "100vw" }}>
                  <Chat />
                </div>
              }></Route>
            <Route
              path="/auth/signup"
              element={
                <SignUp signUp={signUp} signUpRef={signUpRef} />
              }></Route>
            <Route
              path="/auth/login"
              element={<Login signIn={signIn} loginRef={loginRef} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
