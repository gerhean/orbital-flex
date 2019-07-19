import firebase from 'firebase';
import '@firebase/firestore'
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
} from '../actions/actionTypes';

import {  
  db, 
  displayErrorMessage, 
} from './backendConstants';

const initialUser = {
  username: "Unnamed user",
  contact: "",
  about: "",
  profilePic: "",
  gender: 0, // means unspecified gender
  bookedSchedules: {}, // might be violate privacy but lets leave it for now
  postedSchedules: {},
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
      const uid = result.user.uid;
      let user = {
        ...initialUser
      };
      const userDocRef = db.collection('users').doc(uid);
      yield call([userDocRef, userDocRef.set], user);
      user = {
        ...user,
        uid
      }
      yield put({ type: SIGNUP_SUCCESS, user });
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call(displayErrorMessage, error, SIGNUP_INITIALIZE);
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
      const error_message = { code: error.code, message: error.message };
      yield put({ type: LOGIN_FAIL, error: error_message });
      yield call(displayErrorMessage, error, LOGIN_EMAIL);
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