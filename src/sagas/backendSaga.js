import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import Chatkit from '@pusher/chatkit-server';
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
	REMOVE_SCHEDULE,
	FETCH_SCHEDULE_SUCCESS,
	BOOK_SCHEDULE,
	BOOK_SCHEDULE_SUCCESS,
	UNBOOK_SCHEDULE,
	UNBOOK_SCHEDULE_SUCCESS,
	CHATROOM_CREATE,
	UPDATE_USER_ROOMS,
	UPDATE_USER_ROOMS_SUCCESS,
	FETCH_ROOM,
	FETCH_ROOM_SUCCESS,
	SEND_MESSAGE,
	FETCH_MESSAGES_SUCCESS

} from '../actions/actionTypes';
// import { ALGOLIA_APP_ID, ALOGOLIA_API_KEY, CHATKIT_INSTANCE_LOCATOR, CHATKIT_KEY} from '../../env';

const algoliasearch = require('algoliasearch/reactnative');
const client = algoliasearch(ALGOLIA_APP_ID, ALOGOLIA_API_KEY);
const ALGOLIA_INDEX_NAME = 'trainer_schedules';
const schedule_index = client.initIndex(ALGOLIA_INDEX_NAME);

// const chatkit = new Chatkit.default({
// 	instanceLocator: CHATKIT_INSTANCE_LOCATOR,
// 	key: CHATKIT_KEY,
// })

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const deleteField = firebase.firestore.FieldValue.delete;
const db = firebase.firestore();

const initialUser = {
  username: "Unnamed user",
  contact: "",
  about: "",
  profilePic: "",
  gender: 0, // means unspecified gender
  bookedSchedules: {}, // might be violate privacy but lets leave it for now
  postedSchedules: {},
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

	yield takeLeading(SCHEDULE_CREATE, function*(action){
	  try {
			const uid = firebase.auth().currentUser.uid;
			const posterName = yield select(state => state.user.username);
			const schedule = { ...action.payload, poster: uid, bookers: {}, posterName, timeCreated: serverTimestamp() }
			const collectionRef = db.collection("trainer_schedules")
	    const ref = yield call([collectionRef, collectionRef.add], schedule);
 
			// index schedule to algolia https://www.algolia.com/doc/api-reference/api-methods/add-objects/
			yield call([schedule_index, schedule_index.addObject], { ...schedule, objectID: ref.id })
								
	    const userRef = db.collection('users').doc(uid) 
	    yield call([userRef, userRef.update], {[`postedSchedules.${ref.id}`]: true})
			schedule["isBooked"] = -1;
	    yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) // need to navigate back to home page/search page
	} catch (error) {
	    // const error_message = { code: error.code, message: error.message };
	    // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
	    yield call(displayErrorMessage, error, SCHEDULE_CREATE);
	  }
	})

	yield takeLeading(SCHEDULE_UPDATE, function*(action){
    try {
    	const schedule = action.schedule;
    	const scheduleId = schedule.scheduleId;
    	delete schedule.scheduleId;
			const ref = db.collection('trainer_schedules').doc(scheduleId) 
		
	    yield call(
	    	[ref, ref.update], 
	    	schedule
			)
			yield call([schedule_index, schedule_index.partialUpdateObject], { ...schedule, objectID: scheduleId })
		  yield put({ type: SCHEDULE_UPDATE_SUCCESS, schedule: action.schedule, scheduleId })
		  yield call(displayMessage, "Schedule Updated");	  
    } catch (error) {      
    	yield call(displayErrorMessage, error, SCHEDULE_UPDATE);
    }
  })

	yield takeLeading(SCHEDULE_FETCH_HOME, function*(action){
    try {
    	let bookedIds; let postedIds;
    	if (action.user) {
    		bookedIds = action.user.bookedSchedules; postedIds = action.user.postedSchedules;
    	} else {
	    	bookedIds = yield select(state => state.user.bookedSchedules);
		    postedIds = yield select(state => state.user.postedSchedules);
    	}
    	const booked = [];
    	const posted = [];

    	for (const scheduleId in bookedIds) {
    		yield put({ type: FETCH_SCHEDULE, scheduleId, isBooked: 1 });
    		booked.push(scheduleId);
    	};

    	for (const scheduleId in postedIds) {
    		yield put({ type: FETCH_SCHEDULE, scheduleId, isBooked: -1 });
    		posted.push(scheduleId);
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
		   	for (const scheduleId of Object.keys(user.postedSchedules)) {
		   		yield put({ type: FETCH_SCHEDULE, scheduleId });
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
    	const storedSchedule = yield select(state => state.schedules[id]);
    	if (!storedSchedule || (Date.now() - storedSchedule.timeFetched > 300000)) { // reduce api calls
		    const docRef = db.collection('trainer_schedules').doc(id);
		   	const scheduleData = yield call([docRef, docRef.get]);
		   	
		   	let isBooked = 0;
		   	const booked = yield select(state => state.user.bookedSchedules[id]);
		   	if (booked) {
		   		isBooked = 1;
		   	} else {
		   		const posted = yield select(state => state.user.postedSchedules[id]);
		   		if (posted) {
		   			isBooked = -1;
		   		}
		   	}

		   	const data = yield scheduleData.data();
		   	if (!data) {
		   		yield call(displayErrorMessage, {code: '', message:'Schedule data has been deleted'}, FETCH_SCHEDULE);
		   		yield put({ type: REMOVE_SCHEDULE, id, isBooked });
		   	} else {
			   	const schedule = yield {
			   		...data,
			   		id,
			   		timeFetched: Date.now(),
			   		isBooked,
			   	}
			    yield put({ type: FETCH_SCHEDULE_SUCCESS, id, schedule });
		   	}
    	}

    } catch (error) {
      yield call(displayErrorMessage, error, FETCH_SCHEDULE);
    }
  })

  yield takeEvery(REMOVE_SCHEDULE, function*(action){
    try {
    	const uid = firebase.auth().currentUser.uid;
    	const scheduleId = action.id;
	   	const userRef = db.collection('users').doc(uid) 
    	if (action.isBooked == 1) {
		    yield call([userRef, userRef.update], {[`bookedSchedules.${scheduleId}`]: deleteField()})
    	} else if (action.isBooked == -1) {
    		yield call([userRef, userRef.update], {[`postedSchedules.${scheduleId}`]: deleteField()})
		}
		yield call([schedule_index, schedule_index.deleteObject], scheduleId)
    } catch (error) {
      yield call(displayErrorMessage, error, REMOVE_SCHEDULE);
    }
  })

  yield takeLeading(BOOK_SCHEDULE, function*(action){
    try {
    	const scheduleId = action.scheduleId;
    	const offer = action.offer;
    	const uid = firebase.auth().currentUser.uid;
		  const bookersRef = db.collection('trainer_schedules').doc(scheduleId);
    	yield call([bookersRef, bookersRef.update], {[`bookers.${uid}`]: offer});

    	const userRef = db.collection('users').doc(uid) 
	    yield call([userRef, userRef.update], {[`bookedSchedules.${scheduleId}`]: true})

	    yield put({ type: BOOK_SCHEDULE_SUCCESS, scheduleId, offer });

    } catch (error) {
      yield call(displayErrorMessage, error, BOOK_SCHEDULE);
    }
  })

  yield takeLeading(UNBOOK_SCHEDULE, function*(action){
    try {
    	const scheduleId = action.scheduleId;
    	const offer = action.offer;
    	const uid = firebase.auth().currentUser.uid;
		  const bookersRef = db.collection('trainer_schedules').doc(scheduleId);
    	yield call([bookersRef, bookersRef.update], {[`bookers.${uid}`]: deleteField()});

    	const userRef = db.collection('users').doc(uid) 
	    yield call([userRef, userRef.update], {[`bookedSchedules.${scheduleId}`]: deleteField()})
	    yield put({ type: UNBOOK_SCHEDULE_SUCCESS, scheduleId });

    } catch (error) {
      yield call(displayErrorMessage, error, UNBOOK_SCHEDULE);
    }
  })

  yield takeLeading(CHATROOM_CREATE, function*(action){
	try {
		const hasExistingChat = false;
		const uid = firebase.auth().currentUser.uid;
		const other_uid = action.schedule.poster;
		for (const existingId of Object.keys(user.hasChatWith)) {
			if (existingId === other_uid) {
				hasExistingChat = true;
			}
		} 
		if (!hasExistingChat) {
			// const other_name = action.schedule.posterName;
			let chatroom = { user1_id: uid, user2_id: other_uid };
			const collectionRef = db.collection("chatrooms");
			const ref = yield call([collectionRef, collectionRef.add], chatroom);
			const roomRef = db.collection('chatrooms').doc(ref.id);
			chatroom = { ...chatroom, roomId: ref.id }
			yield call(
				[roomRef, roomRef.update], 
				chatroom
			)
			const userRef = db.collection('users').doc(uid);
			const otherUserRef = db.collection('users').doc(other_uid);
			yield call([userRef, userRef.update], {[`chatrooms.${ref.id}`]: true});
			yield call([otherUserRef, otherUserRef.update], {[`chatrooms.${ref.id}`]: true});
			yield call([userRef, userRef.update], {[`hasChatWith.${other_uid}`]: true});
			yield call([otherUserRef, otherUserRef.update], {[`hasChatWith.${uid}`]: true});
			yield put({ type: CHATROOM_CREATE_SUCCESS, chatroom, roomId: ref.id })
		} // find existing room
  } catch (error) {
	  yield call(displayErrorMessage, error, CHATROOM_CREATE);
	}
  })

  yield takeEvery(UPDATE_USER_ROOMS, function*(action) {
    try {
		const userId = action.user.uid; 
		const userDocRef = db.collection('users').doc(userId);
		   	const userData = yield call([userDocRef, userDocRef.get]);
		   	const user = yield {
		   		...userData.data(),
		   		timeFetched: Date.now()
			   }
		const userRooms = []
		for (const roomId of Object.keys(user.chatrooms)) {
			const docRef = db.collection("chatrooms").doc(roomId);
			const fetchedRoom = yield call([docRef, docRef.get]);
			userRooms.push(fetchedRoom);
		}
		yield put({ type: UPDATE_USER_ROOMS_SUCCESS, userRooms}) 
    } catch (error) {
      yield call(displayErrorMessage, error, UPDATE_USER_ROOMS);
    }
  })

  yield takeEvery(FETCH_ROOM, function*(action) {
	  try {
		let current_room = action.room;
		yield put({ type: FETCH_MESSAGES, room: current_room });
		yield put({ type: FETCH_ROOM_SUCCESS, current_room });
	  } catch (error) {
		yield call(displayErrorMessage, error, FETCH_ROOM);
	  }
  })

  yield takeEvery(FETCH_MESSAGES, function*(action) {
	try {
		const collectionRef = db.collection("chatrooms").doc(action.room.roomId)
			.collection("messages")
		const messages = yield call([collectionRef, collectionRef.get]); 
		yield put({ type: FETCH_MESSAGES_SUCCESS, messages });
	} catch (error) {
	  	yield call(displayErrorMessage, error, FETCH_MESSAGES);
	}
})

  yield takeEvery(SEND_MESSAGE, function*(action){
	try {
		const collectionRef = db.collection("chatrooms").doc(action.message.roomId)
			.collection("messages");
		yield call([collectionRef, collectionRef.add], action.message);
		yield put({ type: FETCH_MESSAGES, room: action.message.roomId });
	  } catch (error) {
		yield call(displayErrorMessage, error, SEND_MESSAGE);
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