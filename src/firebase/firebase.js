// import app from "firebase/app";
import "firebase/auth";

import firebase from 'firebase'
import { firebaseConfig } from "../../env.js";

// class Firebase {
//   constructor() {
//     // console.log(firebaseConfig);
//     app.initializeApp(firebaseConfig);
//     this.auth = app.auth();
//   }

//   // *** Auth API ***

//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   // doPasswordUpdate = password =>
//   //   this.auth.currentUser.updatePassword(password);
// }

firebase.initializeApp(firebaseConfig);
export default Firebase;
