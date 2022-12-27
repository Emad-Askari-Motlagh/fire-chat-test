import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDUlkP3ZshX7SAv9-VGXy0o70heugv5xj4",
  authDomain: "sender-app-d1007.firebaseapp.com",
  projectId: "sender-app-d1007",
  storageBucket: "sender-app-d1007.appspot.com",
  messagingSenderId: "230622223582",
  appId: "1:230622223582:web:c3708e8cbba3073eb4764f",
  measurementId: "G-W0BD0E7KT5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { auth, storage };
export default db;
