// import firebase from 'react-native-firebase';
import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
// import db from '../firebase';
import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects';
import { 
	INITIALIZE_APP,
	INITIALIZE_APP_SUCCESS,
	LOGIN_INITIALIZE,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SIGNUP_INITIALIZE, 
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	LOGOUT,
	LOGOUT_SUCCESS,
	SCHEDULE_CREATE,
	SCHEDULE_CREATE_SUCCESS,
	SCHEDULE_FETCH_HOME,
	SCHEDULE_FETCH_HOME_SUCCESS,
	SCHEDULE_UPDATE,
	SCHEDULE_UPDATE_SUCCESS,
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_SUCCESS
} from '../actions/actionTypes';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebase.firestore();

function* backendSaga() {

	yield takeEvery(INITIALIZE_APP, function*(action){
	  try {
	    const auth = firebase.auth()
	    const user = auth.currentUser;
	    if (!user) {
	       yield put({ type: LOGOUT });
	    }
	    yield put({ type: INITIALIZE_APP_SUCCESS });
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    yield put({ type: SIGNUP_FAIL, error: error_message });
	    yield call(displayErrorMessage, error, INITIALIZE_APP);
	  }
	})

  yield takeEvery(SIGNUP_INITIALIZE, function*(action){
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
	    	gender: 0, // means unspecified gender
	    	profilePic: '',
			  username: uid,
			  postedSchedules: {},
			  bookedSchedules: {}, // might be violate privacy but lets leave it for now
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

	yield takeEvery(LOGIN_INITIALIZE, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call(
	      [auth, auth.signInWithEmailAndPassword],
	      action.user.email,
	      action.user.password
	    )
	    const uid = result.user.uid;
	    const userDocRef = db.collection('users').doc(uid);
	   	const userData = yield call([userDocRef, userDocRef.get]);
	   	const user = {
	   		...userData.data(),
	   		uid,
	   	}
	   	console.log(userData.data());
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
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SIGNUP_FAIL, error: error_message });
	    yield call(displayErrorMessage, error, LOGOUT);
	  }
	})

	yield takeEvery(SCHEDULE_CREATE, function*(action){
	  try {
			const uid = firebase.auth().uid;
			const schedule = { ...action.payload, poster: uid, bookers: [], timeCreated: serverTimestamp() }
	    const ref = yield call(db.collection("trainer_schedules").add, schedule);

	    const userRef = db.collection('users').doc(uid) 
	    yield call([userRef, userRef.update], {[`postedSchedules.${ref.id}`]: true})
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) // need to navigate back to home page/search page
	  
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    yield call(displayErrorMessage, error, SCHEDULE_CREATE);
	  }
	})

	yield takeEvery(SCHEDULE_UPDATE, function*(action){
    try {
    	const scheduleId = "SOME NUMBER"
    	const ref = db.collection('trainer_schedules').doc(scheduleId) 
	    yield call(
	    	[ref, ref.update], 
	    	{ ...action.schedule }
	    )
      yield put({ type: SCHEDULE_UPDATE_SUCCESS, schedule: action.schedule })
      yield call([displayMessage], "Schedule Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error, SCHEDULE_UPDATE);
    }
  })

	yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
    	const scheduleCollection = db.collection('trainer_schedules');
    	const bookedIds = select(state => state.user.bookedScheduleIds);
	    const postedIds = select(state => state.user.postedScheduleIds);
    	const booked = [];
    	const posted = [];

    	for (const id in bookedIds) {
    		const docRef = scheduleCollection.doc(id);
    		const data = yield call([docRef, docRef.get]);
    		booked.push(data.data());
    	};

    	for (const id in postedIds) {
    		const docRef = scheduleCollection.doc(id);
    		const data = yield call([docRef, docRef.get]);
    		posted.push(data.data());
    	};

      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked, 
        posted 
      }) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error, SCHEDULE_FETCH_HOME)
    }
  })

  yield takeEvery(UPDATE_USER_INFO, function*(action){
    try {
    	const userRef = db.collection('users').doc(uid) 
	    yield call(
	    	[userRef, userRef.update], 
	    	{ ...action.userInfo }
	    )
      yield put({ type: UPDATE_USER_INFO_SUCCESS, userInfo: action.userInfo })
      yield call([displayMessage], "User Info Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error, UPDATE_USER_INFO);
    }
  })
}

const displayErrorMessage = (error, location = '') => {
	console.log(error.message + ". Error at: " + location);
  Toast.show({ text: "Error " + error.code + ": " + error.message, duration: 4000 });
}

const displayMessage = (message) => {
  Toast.show({ text: message })
}

export default backendSaga