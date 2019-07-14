import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import { takeLatest, takeEvery, takeLeading, put, call, select } from 'redux-saga/effects';

import { 
	CHATROOM_CREATE,
	UPDATE_USER_ROOMS,
	UPDATE_USER_ROOMS_SUCCESS,
	FETCH_ROOM,
	FETCH_ROOM_SUCCESS,
	SEND_MESSAGE,
	FETCH_MESSAGES,
	FETCH_MESSAGES_SUCCESS,
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

function* chatSaga() {

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
				const userRef = db.collection('user_chatrooms').doc(uid);
				const otherUserRef = db.collection('user_chatrooms').doc(other_uid);
				yield call([userRef, userRef.update], {[ref.id]: other_uid});
				yield call([otherUserRef, otherUserRef.update], {[ref.id]: uid});
				yield put({ type: CHATROOM_CREATE_SUCCESS, chatroom, roomId: ref.id })
			} // find existing room
	  } catch (error) {
		  yield call(displayErrorMessage, error, CHATROOM_CREATE);
		}
	  })
	
	yield takeEvery(UPDATE_USER_ROOMS, function*(action) {
	try {
		const userId = action.user.uid; 
		const userDocRef = db.collection('user_chatrooms').doc(userId);
		const userData = yield call([userDocRef, userDocRef.get]);
		const userChatrooms = userData.data();
		const userRooms = []
		for (const roomId of Object.keys(userChatrooms)) {
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

export default chatSaga;