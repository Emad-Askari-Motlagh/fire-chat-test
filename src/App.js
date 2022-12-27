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
  const { userLoading } = useAuth();

  const { signIn, signUp, loginRef, signUpRef, signOut } = useAuth();
  const LoginEl = () => <Login signIn={signIn} loginRef={loginRef} />;
  return (
    <div className="app">
      <Header user={user?.email} signOut={signOut}></Header>
      <div className="app_body">
        <BrowserRouter>
          <Routes>
            <Route path="/chat/rooms/:roomId" element={<Chat />}></Route>
            {!userLoading || user ? (
              <Route path="/" element={<Users />}></Route>
            ) : (
              <Route path="/" element={<Login />}></Route>
            )}
            <Route path="/:roomId" element={<Chat />}></Route>
            <Route
              path="/auth/signup"
              element={
                <SignUp signUp={signUp} signUpRef={signUpRef} />
              }></Route>
            <Route path="/auth/login" element={<LoginEl />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
