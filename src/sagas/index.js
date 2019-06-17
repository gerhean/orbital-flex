import firebase from 'firebase';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  LOGIN_EMAIL
} from '../actions/actionTypes';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//    try {
//       const user = yield call(Api.fetchUser, action.payload.userId);
//       yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//    } catch (e) {
//       yield put({type: "USER_FETCH_FAILED", message: e.message});
//    }
// }

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {

  yield takeEvery(LOGIN_EMAIL, function*(action) {
    try {
      const user = yield call(
        firebase.auth().signInWithEmailAndPassword, 
        action.payload.email, 
        action.payload.password
      );
      yield put({type: "LOGIN_SUCCESS", user: user});
    } catch (e) {
      yield put({type: "LOGIN_FAILED", message: e.message});
    }
  });

}

export default mySaga;