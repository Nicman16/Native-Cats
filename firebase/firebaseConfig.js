// firebase/firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5sKhdMaIJ7pcAEp_WvVKTqfcTIkykegs",
  authDomain: "native-cats.firebaseapp.com",
  projectId: "native-cats",
  storageBucket: "native-cats.appspot.com",
  messagingSenderId: "1052172579681",
  appId: "1:1052172579681:web:26b54b5fc39011fed4cb20",
  measurementId: "G-EPRE5CYBZ1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

