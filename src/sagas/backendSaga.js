import firebase from 'firebase';
import { Toast } from 'native-base';
import db from '../firebase';
import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects';
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

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

function* backendSaga() {
  yield takeEvery(SIGNUP_INITIALIZE, function*(action){
	  try {
	    const auth = firebase.auth()
	    const result = yield call(
	      [auth, auth.createUserWithEmailAndPassword],
	      action.user.email,
	      action.user.password
	    )
	    const uid = result.uid;
	   	console.log(uid);
	    let user = {
	    	gender: 0,
	    	profilePic: '',
			  username: uid,
			  postedSchedules: [],
			  bookedSchedules: [], // might be violate privacy but lets leave it for now
			};
			yield call([db.collection('users').doc(uid).set], user);
			user = {
				...user,
				uid
			}
	    yield put({ type: SIGNUP_SUCCESS, user });
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
	    const uid = result.uid;
	   	console.log(uid);
	   	const userData = yield call([db.collection('users').doc(uid).get])
	   	const user = {
	   		...userData.data(),
	   		uid,
	   	}
	   	console.log(user);
	    yield put({ type: LOGIN_SUCCESS, user });
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
	    yield call([displayErrorMessage], error);
	  }
	})

	yield takeEvery(SCHEDULE_CREATE, function*(action){
	  try {
			const uid = firebase.auth().uid;
			const schedule = { ...action.payload, poster:uid, bookers: [], }
	    const ref = yield call([db.collection("trainer_schedules").add], schedule);

	    const userRef = db.collection('users').doc(uid) 
	    yield call([userRef.update], {postedSchedules: arrayUnion(ref.id)})
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) // need to navigate back to home page/search page
	  
	  } catch (error) {
	    const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    console.log(error.message);
	    yield call([displayErrorMessage], error);
	  }
	})

	yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
    	const scheduleCollection
    	const bookedIds = select(state => state.user.bookedScheduleIds);
	    const postedIds = select(state => state.user.postedScheduleIds);
    	const booked = [];
    	const posted = [];

    	bookedIds.forEach(id => {
    		const data = yield call([scheduleCollection.doc(id).get]);
    		booked.push(data.data());
    	});
    	postedIds.forEach(id => {
    		const data = yield call([scheduleCollection.doc(id).get]);
    		posted.push(data.data());
    	});

      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked, 
        posted 
      }) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call([displayErrorMessage], error)
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
      yield call([displayErrorMessage], error)
    }
  })
}

const displayErrorMessage = (error) => {
  Toast.show({ text: "Error " + error.code + ": " + error.message })
}

const displayMessage = (message) => {
  Toast.show({ text: message })
}

export default backendSaga