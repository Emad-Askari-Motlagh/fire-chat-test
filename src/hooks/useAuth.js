import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import db, { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

import { redirect } from "react-router-dom";

export default function useAuth() {
  const [{}, dispatch] = useStateValue();
  const loginRef = useRef();
  const signUpRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState();

  async function getAllUsers() {
    const users = [];
    const res = await (await db.collection("users").get()).docs;
    res.forEach((res) => {
      users.push(res.data());
    });
    return users;
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUserLoading(true);
      if (user.uid) {
        setUserLoading(false);
      }
      setCurrentUser(user);
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
        userLoading: false,
      });
    });
  }, []);

  const signIn = async (e) => {
    e.preventDefault();

    const { username, password } = loginRef.current;

    try {
      const result = await auth.signInWithEmailAndPassword(
        username.value,
        password.value
      );
      console.log(result);
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
      if (result.user) window.location.href = "/";
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const signUp = async (e) => {
    e.preventDefault();
    const { username, password } = signUpRef.current;
    try {
      const result = await auth.createUserWithEmailAndPassword(
        username.value,
        password.value
      );
      await db.collection("users").doc(result.user.uid).set({
        username: result.user.email,
        uid: result.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
      if (result.user) window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };
  const signOut = () => {
    auth.signOut();
    window.location.reload();
  };
  return {
    signIn,
    signUp,
    loginRef,
    signUpRef,
    currentUser,
    signOut,
    getAllUsers,
    userLoading,
  };
}
