import * as firebase from 'firebase';
import 'firebase/firestore';
import FirebaseContext, { withFirebase } from "./context";

export { FirebaseContext, withFirebase };

import { firebaseConfig } from "../../env.js";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
