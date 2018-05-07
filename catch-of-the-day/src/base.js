import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDWgl4A6uE7iD2r2QBz6tbuAphCbQprTE0",
  authDomain: "catch-of-the-day-15ab8.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-15ab8.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;