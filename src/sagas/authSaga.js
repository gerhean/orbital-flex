import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import { takeLatest, takeEvery, takeLeading, put, call, select } from 'redux-saga/effects';

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
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_SUCCESS,
	FETCH_USER_INFO,
	FETCH_USER_INFO_SUCCESS,
} from '../actions/actionTypes';

import { 
	client, 
	schedule_index, 
	serverTimestamp, 
	deleteField, 
	db, 
	displayErrorMessage, 
	displayMessage
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
	    const result = yield call(
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

	yield takeLeading(UPDATE_USER_INFO, function*(action){
    try {
    	const uid = firebase.auth().currentUser.uid;
    	const userRef = db.collection('users').doc(uid)
	    yield call(
	    	[userRef, userRef.update], 
	    	action.userInfo
	    )
      yield put({ type: UPDATE_USER_INFO_SUCCESS, userInfo: action.userInfo })
      yield call(displayMessage, "User Info Updated");
    } catch (error) {
      yield call(displayErrorMessage, error, UPDATE_USER_INFO);
    }
  })

  yield takeEvery(FETCH_USER_INFO, function*(action){
    try {
    	const uid = action.uid;
    	const storedUser = yield select(state => state.users[uid]);
    	if (!storedUser || (Date.now() - storedUser.timeFetched > 300000)) { // reduce api calls
		    const userDocRef = db.collection('users').doc(uid);
		   	const userData = yield call([userDocRef, userDocRef.get]);
		   	const user = yield {
		   		...userData.data(),
		   		uid,
		   		timeFetched: Date.now()
		   	}

		    yield put({ type: FETCH_USER_INFO_SUCCESS, uid, user });
    	}

    } catch (error) {
      yield call(displayErrorMessage, error, FETCH_USER_INFO);
    }
  })

}

export default authSaga;