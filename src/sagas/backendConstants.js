import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import algoliasearch from 'algoliasearch/reactnative';

import { ALOGOLIA_APP_ID, ALOGOLIA_API_KEY } from '../../env';

export const client = algoliasearch(ALOGOLIA_APP_ID, ALOGOLIA_API_KEY);
export const ALGOLIA_INDEX_NAME = 'trainer_schedules';
export const schedule_index = client.initIndex(ALGOLIA_INDEX_NAME);

// const chatkit = new Chatkit.default({
// 	instanceLocator: CHATKIT_INSTANCE_LOCATOR,
// 	key: CHATKIT_KEY,
// })

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const deleteField = firebase.firestore.FieldValue.delete;
export const db = firebase.firestore();

export const displayErrorMessage = (error, location = '') => {
	console.log(error.message + ". Error at: " + location);
  Toast.show({ text: "Error " + error.code + ": " + error.message, duration: 4000 });
}

export const displayMessage = (message) => {
  Toast.show({ text: message })
}