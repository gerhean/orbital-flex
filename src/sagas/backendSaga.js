import firebase from 'firebase';
import { Toast } from 'native-base';
import db from '../firebase';
import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { 
	LOGIN_INITIALIZE,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SIGNUP_INITIALIZE, 
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	LOGOUT,
	SCHEDULE_CREATE,
	SCHEDULE_CREATE_SUCCESS
} from '../actions/actionTypes';

function* backendSaga() {
  yield takeEvery(SIGNUP_INITIALIZE, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call(
	      [auth, auth.createUserWithEmailAndPassword],
	      action.user.email,
	      action.user.password
	    )
	    yield put({ type: SIGNUP_SUCCESS, payload: result });
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    yield put({ type: SIGNUP_FAIL, error: error_message });
	  }
	})

	yield takeEvery(LOGIN_INITIALIZE, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call(
	      [auth, auth.signInWithEmailAndPassword],
	      action.user.email,
	      action.user.password
	    )
	    yield put({ type: LOGIN_SUCCESS, payload: result });
	  } catch (error) {
	  	console.log(error.message);
	    const error_message = { code: error.code, message: error.message };
	    yield put({ type: LOGIN_FAIL, error: error_message });
	  }
	})

	yield takeEvery(LOGOUT, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call([auth, auth.signOut])
	    // yield put({ type: LOGIN_SUCCESS, payload: result });
	  } catch (error) {
	  	console.log(error.message);
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SIGNUP_FAIL, error: error_message });
	    yield call([Toast.show], {
        text: "Error " + error.code + ": " + error.message
      })
	  }
	})

	yield takeEvery(SCHEDULE_CREATE, function*(action){
	  try {
		  // trainer_schedules have users(trainers), users can post schedules
			const currentUserUid = firebase.auth().uid;
	    yield call(
	    	[db, db.collection("trainer_schedules").add], 
	    	{ ...action.payload })
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule: action.payload }) // need to navigate back to home page/search page
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    console.log(error.message);
	    yield call([Toast.show], {
        text: "Error " + error.code + ": " + error.message
      })
	  }
	})
}

export default backendSaga