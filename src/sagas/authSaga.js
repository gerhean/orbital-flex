import firebase from 'firebase';
import '@firebase/firestore'
import { Alert } from 'react-native';
import { takeEvery, takeLeading, put, call } from 'redux-saga/effects';

import { 
  LOGIN_EMAIL,
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_INITIALIZE, 
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  RESET_PASSWORD
} from '../actions/actionTypes';

import {  
  db, 
  displayErrorMessage, 
  displayMessage
} from './backendConstants';

//const console = require('console');

const initialUser = {
  contact: "",
  about: "",
  profilePic: "",
  gender: 0, // means unspecified gender
  bookedSchedules: {}, // might be violate privacy but lets leave it for now
  postedSchedules: {},
  followedUsers: {},
};

function* authSaga() {

  yield takeLeading(SIGNUP_INITIALIZE, function*(action){
    try {
      const auth = firebase.auth()
      yield call([auth, auth.setPersistence], firebase.auth.Auth.Persistence.LOCAL)
      const result = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.user.email,
        action.user.password
      )
      const currentUser = auth.currentUser;
      yield call([currentUser, currentUser.sendEmailVerification])
      const uid = result.user.uid;
      let user = {
        ...initialUser,
        username: action.user.username
      };
      const userDocRef = db.collection('users').doc(uid);
      yield call([userDocRef, userDocRef.set], user);
      user = {
        ...user,
        uid
      }
      yield put({ type: SIGNUP_SUCCESS, user });
      Alert.alert(
        'Welcome!'
     )
    } catch (error) {
      // const error_message = { code: error.code, message: error.message };
      // yield put({ type: SIGNUP_FAIL, error: error_message });
      // yield call(displayErrorMessage, error, SIGNUP_INITIALIZE);
      yield call(displayMessage, "The email address you have entered is already in use.");
    }
  })

  yield takeEvery(RESET_PASSWORD, function*(action){
    try{
      const auth = firebase.auth();
      console.log(action.email);
      yield call([auth, auth.sendPasswordResetEmail], action.email.email);
      Alert.alert(
        'A link to reset password has been sent to your email.'
      );
    } catch (error) {
      // yield call(displayErrorMessage, error, RESET_PASSWORD);
      yield call(displayMessage, "You have entered an invalid email!");
    }
  })

  yield takeLeading(LOGIN_EMAIL, function*(action){
    try {
      const auth = firebase.auth()
      yield call(
        [auth, auth.signInWithEmailAndPassword],
        action.user.email,
        action.user.password
      )
      yield put({ type: LOGIN_INITIALIZE });
    } catch (error) {
      // const error_message = { code: error.code, message: error.message };
      // yield put({ type: LOGIN_FAIL, error: error_message });
      // yield call(displayErrorMessage, error, LOGIN_EMAIL);
      yield call(displayMessage, "You have entered an invalid email or password!");
    }
  })

  yield takeLeading(LOGIN_INITIALIZE, function*(action){
    try {
      const uid = firebase.auth().currentUser.uid;
      const userDocRef = db.collection('users').doc(uid);
      const userData = yield call([userDocRef, userDocRef.get]);
      const user = yield {
        ...initialUser,
        ...userData.data(),
        uid,
       }
    
      yield put({ type: LOGIN_SUCCESS, user });
      Alert.alert(
        'Welcome!'
     )
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: LOGIN_FAIL, error: error_message });
      yield call(displayErrorMessage, error, LOGIN_INITIALIZE);
    }
  })

  yield takeEvery(LOGOUT, function*(action){
    try {
      const auth = firebase.auth()
    const result = yield call([auth, auth.signOut])
      yield put({ type: LOGOUT_SUCCESS, payload: result });
    } catch (error) {
      // const error_message = { code: error.code, message: error.message };
      // yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call(displayErrorMessage, error, LOGOUT);
    }
  })

}

export default authSaga;