// import firebase from 'react-native-firebase';
import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
// import db from '../firebase';
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
	SCHEDULE_CREATE,
	SCHEDULE_CREATE_SUCCESS,
	SCHEDULE_FETCH_HOME,
	SCHEDULE_FETCH_HOME_SUCCESS,
	SCHEDULE_UPDATE,
	SCHEDULE_UPDATE_SUCCESS,
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_SUCCESS,
	FETCH_USER_INFO,
	FETCH_USER_INFO_SUCCESS,
	FETCH_SCHEDULE,
	FETCH_SCHEDULE_SUCCESS,
} from '../actions/actionTypes';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebase.firestore();

const initialUser = {
  username: "Unnamed user",
  contact: "",
  about: "",
  profilePic: "",
  gender: 0, // means unspecified gender
  bookedScheduleIds: {}, // might be violate privacy but lets leave it for now
  postedScheduleIds: {},
};

function* backendSaga() {

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
	   	const user = {
	   		...initialUser,
	   		...userData.data(),
	   		uid,
	   	}
	   	console.log(LOGIN_INITIALIZE);
	   	console.log(user);
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

	yield takeLeading(SCHEDULE_CREATE, function*(action){
	  try {
			const uid = firebase.auth().currentUser.uid;
			const posterName = yield select(state => state.user.username);
			const schedule = { ...action.payload, poster: uid, posterName, timeCreated: serverTimestamp() }
			const collectionRef = db.collection("trainer_schedules")
	    const ref = yield call([collectionRef, collectionRef.add], schedule);

	    const userRef = db.collection('users').doc(uid) 
	    yield call([userRef, userRef.update], {[`postedSchedules.${ref.id}`]: true})
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) // need to navigate back to home page/search page
	  
	  } catch (error) {
	    // const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    yield call(displayErrorMessage, error, SCHEDULE_CREATE);
	  }
	})

	yield takeLeading(SCHEDULE_UPDATE, function*(action){
    try {
    	const scheduleId = action.schedule.scheduleId;
    	const ref = db.collection('trainer_schedules').doc(scheduleId) 
	    yield call(
	    	[ref, ref.update], 
	    	{ ...action.schedule }
	    )
      yield put({ type: SCHEDULE_UPDATE_SUCCESS, schedule: action.schedule })
      yield call(displayMessage, "Schedule Updated");
    } catch (error) {      
    	yield call(displayErrorMessage, error, SCHEDULE_UPDATE);
    }
  })

	yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
    	const scheduleCollection = db.collection('trainer_schedules');
    	const bookedIds = yield select(state => state.user.bookedSchedules);
	    const postedIds = yield select(state => state.user.postedSchedules);
    	const booked = [];
    	const posted = [];

    	for (const id in bookedIds) {
    		const docRef = scheduleCollection.doc(id);
    		const data = yield call([docRef, docRef.get]);
    		const schedule = data.data() 
    		schedule["scheduleId"] = id;
    		booked.push(schedule);
    	};

    	for (const id in postedIds) {
    		const docRef = scheduleCollection.doc(id);
    		const data = yield call([docRef, docRef.get]);
    		const schedule = data.data() 
    		schedule["scheduleId"] = id;
    		posted.push(schedule);
    	};

      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked, 
        posted 
      }) 
    } catch (error) {
      yield call(displayErrorMessage, error, SCHEDULE_FETCH_HOME)
    }
  })

  yield takeLeading(UPDATE_USER_INFO, function*(action){
    try {
    	const uid = firebase.auth().currentUser.uid;
    	console.log(uid);
    	const userRef = db.collection('users').doc(uid)
    	console.log(action.userInfo); 
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
    	if (!storedUser || (Date.now() - storedUser.timeFetched > 3000000)) { // reduce api calls
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

  yield takeEvery(FETCH_SCHEDULE, function*(action){
    try {
    	const id = action.scheduleId;
    	const storedSchedule = yield select(state => state.users[id]);
    	if (!storedSchedule || (Date.now() - storedSchedule.timeFetched > 3000000)) { // reduce api calls
		    const docRef = db.collection('trainer_schedules').doc(id);
		   	const scheduleData = yield call([docRef, docRef.get]);
		   	const schedule = yield {
		   		...scheduleData.data(),
		   		id,
		   		timeFetched: Date.now()
		   	}
		    yield put({ type: FETCH_SCHEDULE_SUCCESS, id, schedule });
    	}

    } catch (error) {
      yield call(displayErrorMessage, error, FETCH_SCHEDULE);
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