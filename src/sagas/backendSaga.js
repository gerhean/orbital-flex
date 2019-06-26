import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
// import db from '../firebase';
import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects';
import { 
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
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_SUCCESS
} from '../actions/actionTypes';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const db = firebase.firestore();

function* backendSaga() {
  yield takeEvery(SIGNUP_INITIALIZE, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call(
	      [auth, auth.createUserWithEmailAndPassword],
	      action.user.email,
	      action.user.password
	    )
	    const uid = result.user.uid;
	    let user = {
	    	gender: 0,
	    	profilePic: '',
			  username: uid,
			  postedSchedules: [],
			  bookedSchedules: [], // might be violate privacy but lets leave it for now
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
	    yield call(displayErrorMessage, error);
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
	    yield call(displayErrorMessage, error);
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
	    yield call(displayErrorMessage, error);
	  }
	})

	yield takeEvery(SCHEDULE_CREATE, function*(action){
	  try {
			const uid = firebase.auth().uid;
			const schedule = { ...action.payload, poster:uid, bookers: [], }
	    const ref = yield call(db.collection("trainer_schedules").add, schedule);

	    const userRef = db.collection('users').doc(uid) 
	    yield call(userRef.update, {postedSchedules: arrayUnion(ref.id)})
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) // need to navigate back to home page/search page
	  
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    yield call(displayErrorMessage, error);
	  }
	})

	yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
    	const scheduleCollection = db.collection('trainer_schedules');
    	const bookedIds = select(state => state.user.bookedScheduleIds);
	    const postedIds = select(state => state.user.postedScheduleIds);
    	const booked = [];
    	const posted = [];

    	for (const id of bookedIds) {
    		const data = yield call([scheduleCollection.doc(id).get]);
    		booked.push(data.data());
    	};

    	for (const id of postedIds) {
    		const data = yield call([scheduleCollection.doc(id).get]);
    		posted.push(data.data());
    	};

      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked, 
        posted 
      }) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error)
    }
  })

  yield takeEvery(UPDATE_USER_INFO, function*(action){
    try {
    	let username, contact, about, profilePic, gender;

    	const userRef = db.collection('users').doc(uid) 
	    yield call(
	    	[userRef.update], 
	    	{
	    		about,
	    		contact,
	    		gender,
	    		profilePic,
	    		username,
	    	}
	    )

      yield put({ type: UPDATE_USER_INFO_SUCCESS, payload: action.userInfo })
      yield call([displayMessage], "User Info Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error);
    }
  })
}

const displayErrorMessage = (error) => {
	console.log(error.message);
  Toast.show({ text: "Error " + error.code + ": " + error.message, duration: 4000 });
}

const displayMessage = (message) => {
  Toast.show({ text: message })
}

export default backendSaga