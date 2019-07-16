import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import { takeLatest, takeEvery, takeLeading, put, call, select } from 'redux-saga/effects';

import { 
	FETCH_CHATROOMS,
	FETCH_CHATROOMS_SUCCESS,
	UPDATE_CHATROOMS,
	CHATROOM_CREATE,
	CHATROOM_CREATE_SUCCESS,
	CHANGE_SCREEN,
	FETCH_MESSAGES,
	FETCH_MESSAGES_SUCCESS,
	SEND_MESSAGE,
	SEND_MESSAGE_SUCCESS,
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

const localTimestamp = firebase.firestore.Timestamp.now;

function* chatSaga() {

	yield takeLeading(FETCH_CHATROOMS, function*(action) { // should only be called once at the very start
		try {
			const uid = firebase.auth().currentUser.uid;
			const userChatroomsRef = db.collection('user_chatrooms').doc(uid);
			const userChatroomsData = yield call([userChatroomsRef, userChatroomsRef.get]);
			const userChatrooms = userChatroomsData.data();
			yield put({ type: UPDATE_CHATROOMS, userChatrooms })

			userChatroomsRef.onSnapshot(doc => {
	     	console.log("Updated data: ", data);
				if (!doc.metadata.hasPendingWrites) {
					const userChatrooms = doc.data();
					put({ type: UPDATE_CHATROOMS, userChatrooms })
				}
	    });

			yield put({ type: FETCH_CHATROOMS_SUCCESS })
		} catch (error) {
			displayErrorMessage(error, FETCH_CHATROOMS);
		}
	})

	yield takeEvery(UPDATE_CHATROOMS, function*(action){
		const userChatrooms = action.userChatrooms;
		const storedChatrooms = yield select(state => state.chat.chatrooms);
		for (const otherUid of Object.keys(userChatrooms)) {
			const chatroom = userChatrooms[otherUid];
			const roomId = chatroom.roomId;
			const storedChatroom = storedChatrooms[roomId];
			if (storedChatroom) {
				if (storedChatroom.lastFetch.nanoseconds < chatroom.updated.nanoseconds) {
					yield put({ type: FETCH_MESSAGES, storedRoom: storedChatroom, roomId })
				}
			} else {
				yield put({ type: FETCH_MESSAGES, roomId, otherUid })
			}
		} 
	})

	yield takeLeading(CHATROOM_CREATE, function*(action){
		try {
			const uid = firebase.auth().currentUser.uid;
			const otherUid = action.otherUid;
			const hasExistingChat = yield select(state => state.chat.hasChatWith[otherUid]);

			if (!hasExistingChat) {
				const chatroom = { 
					user1: uid,
					user2: otherUid,
				};
				const collectionRef = db.collection("chatrooms");
				const ref = yield call([collectionRef, collectionRef.add], chatroom);
				const roomId = ref.id;

				const userRef = db.collection('user_chatrooms').doc(uid);
				const otherUserRef = db.collection('user_chatrooms').doc(otherUid);
				const userChatroom = {roomId, updated: serverTimestamp()};
				yield call([userRef, userRef.update], {[otherUid]: userChatroom});
				yield call([otherUserRef, otherUserRef.update], {[uid]: userChatroom});

				localChatroom = {otherUid, messages: [], lastFetch: localTimestamp()};
				yield put({ type: CHATROOM_CREATE_SUCCESS, chatroom: localChatroom, roomId });
			} else {
				yield put({ type: CHANGE_SCREEN, screen: "Chatroom/" + hasExistingChat });
			}
	  } catch (error) {
		  displayErrorMessage(error, CHATROOM_CREATE);
		}
	})
	
	// yield takeEvery(UPDATE_USER_ROOMS, function*(action) {
	// try {
	// 	const userId = action.user.uid; 
	// 	const userDocRef = db.collection('user_chatrooms').doc(userId);
	// 	const userData = yield call([userDocRef, userDocRef.get]);
	// 	const userChatrooms = userData.data();
	// 	const userRooms = []
	// 	for (const roomId of Object.keys(userChatrooms)) {
	// 		const docRef = db.collection("chatrooms").doc(roomId);
	// 		const fetchedRoom_ss = yield call([docRef, docRef.get]);
	// 		const fetchedRoom = fetchedRoom_ss.data();
	// 		userRooms.push(fetchedRoom);
	// 	}
	// 	yield put({ type: UPDATE_USER_ROOMS_SUCCESS, userRooms}) 
	// } catch (error) {
	// 		displayErrorMessage(error, UPDATE_USER_ROOMS);
	// }
	// })

	yield takeEvery(FETCH_MESSAGES, function*(action) {
		try {
			const roomId = action.roomId; 
			const storedRoom = action.room; // may not exist
			let messageRef;

			if (storedRoom) {
				messageRef = db.collection("chatrooms")
					.doc(roomId)
					.collection("messages")
					.where('sentTime', '>', storedRoom.lastFetch)
					.orderBy("sentTime", "desc");
			} else {
				messageRef = db.collection("chatrooms")
					.doc(roomId)
					.collection("messages")
					.orderBy("sentTime", "desc") 
					.limit(25);
			}
			const querySnapshot = yield call([messageRef, messageRef.get]);
			const messages = querySnapshot.map(doc => doc.data()); 
			
			if (storedRoom) {
				const chatroom = {
					...storedRoom,
					messages: storedRoom.messages.concat(messages)
				}
				yield put({ type: FETCH_MESSAGES_SUCCESS, chatroom, roomId });
			} else {
				const chatroom = {
					otherUid: action.otherUid, 
					messages, 
					lastFetch: localTimestamp()
				};
				yield put({ type: CHATROOM_CREATE_SUCCESS, chatroom, roomId })
			}

		} catch (error) {
			displayErrorMessage(error, FETCH_MESSAGES);
		}
	})

	// yield takeEvery(FETCH_MESSAGES, function*(action) {
	// 	try {
	// 		const collectionRef = db.collection("chatrooms").doc(action.room.roomId)
	// 			.collection("messages")
	// 		const querySnapshot = yield call([collectionRef, collectionRef.get]);
	// 		const messages = querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
	// 		// messages is an array
	// 		yield put({ type: FETCH_MESSAGES_SUCCESS, messages });
	// 	} catch (error) {
	// 			displayErrorMessage(error, FETCH_MESSAGES);
	// 	}
	// })

	yield takeEvery(SEND_MESSAGE, function*(action){
		try {
			const roomId = action.payload.roomId
			const uid = firebase.auth().currentUser.uid;
			const message = {text: action.payload.text, sentTime: serverTimestamp()}
			const collectionRef = db.collection("chatrooms")
				.doc(roomId)
				.collection("messages");
			yield call([collectionRef, collectionRef.add], message);

			const otherUserRef = db.collection('user_chatrooms').doc(action.payload.otherUid);
			yield call([otherUserRef, otherUserRef.update], {[`${uid}.updated`]: serverTimestamp()});

			yield put({ type: SEND_MESSAGE_SUCCESS, message, roomId });
		} catch (error) {
			displayErrorMessage(error, SEND_MESSAGE);
		}
	})

}

export default chatSaga;