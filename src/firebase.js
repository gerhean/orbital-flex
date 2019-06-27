import firebase from 'firebase';

import { firebaseConfig } from "../env.js";
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default firebaseApp;