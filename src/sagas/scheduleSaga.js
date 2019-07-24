import firebase from 'firebase';
import '@firebase/firestore'
import { takeEvery, takeLeading, put, call, select } from 'redux-saga/effects';

import { 
  SCHEDULE_CREATE,
  SCHEDULE_CREATE_SUCCESS,
  SCHEDULE_FETCH_HOME,
  SCHEDULE_FETCH_HOME_SUCCESS,
  SCHEDULE_UPDATE,
  SCHEDULE_UPDATE_SUCCESS,
  FETCH_SCHEDULE,
  REMOVE_SCHEDULE,
  FETCH_SCHEDULE_SUCCESS,
  BOOK_SCHEDULE,
  BOOK_SCHEDULE_SUCCESS,
  UNBOOK_SCHEDULE,
  UNBOOK_SCHEDULE_SUCCESS,
  CANCEL_SCHEDULE,
  CANCEL_SCHEDULE_SUCCESS
} from '../actions/actionTypes';

import { 
  schedule_index, 
  serverTimestamp, 
  deleteField, 
  db, 
  displayErrorMessage, 
  displayMessage
} from './backendConstants';

const storeImage = async (imageLocal, foldername, filename) => {
  const response = await fetch(imageLocal);
  const blob = await response.blob();
  const imageRef = firebase.storage().ref(foldername).child(filename + '.png');
  await imageRef.put(blob);
  const downloadURL = await imageRef.getDownloadURL();
  return downloadURL;
}

function* scheduleSaga() {
  yield takeLeading(SCHEDULE_CREATE, function*(action){
    try {
      displayMessage("Creating Schedule...");
      const uid = firebase.auth().currentUser.uid;
      const posterName = yield select(state => state.user.username);
      const schedule = { ...action.payload, poster: uid, bookers: {}, posterName, timeCreated: serverTimestamp() }
      const collectionRef = db.collection("trainer_schedules")
      const ref = yield call([collectionRef, collectionRef.add], schedule); 
      
      const imageLocal = action.imageLocal;
      if (imageLocal) {
        downloadURL = yield call(storeImage, imageLocal, "scheduleImages", ref.id);
        yield call([ref, ref.update], {image: downloadURL});
        schedule.image = downloadURL;
      }

      // index schedule to algolia https://www.algolia.com/doc/api-reference/api-methods/add-objects/
      yield call([schedule_index, schedule_index.addObject], { ...schedule, objectID: ref.id })
      const userRef = db.collection('users').doc(uid) 
      yield call([userRef, userRef.update], {[`postedSchedules.${ref.id}`]: true})
      schedule["isBooked"] = -1;
      yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: ref.id }) 
      displayMessage("Schedule Created!");
  } catch (error) {
      // const error_message = { code: error.code, message: error.message };
      // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
      yield call(displayErrorMessage, error, SCHEDULE_CREATE);
    }
  })

  yield takeLeading(SCHEDULE_UPDATE, function*(action){
    try {
      displayMessage("Updating Schedule...");
      const { schedule, imageLocal} = action;
      const scheduleId = schedule.scheduleId;
      delete schedule.scheduleId;
      const ref = db.collection('trainer_schedules').doc(scheduleId) 

      if (imageLocal) {
        downloadURL = yield call(storeImage, imageLocal, "scheduleImages", scheduleId);
        schedule.image = downloadURL;
      }
    
      yield call([ref, ref.update], schedule)
      yield call([schedule_index, schedule_index.partialUpdateObject], { ...schedule, objectID: scheduleId })
      yield put({ type: SCHEDULE_UPDATE_SUCCESS, schedule: action.schedule, scheduleId })
      displayMessage("Schedule Updated!");   
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
      }

      for (const scheduleId in postedIds) {
        yield put({ type: FETCH_SCHEDULE, scheduleId, isBooked: -1 });
        posted.push(scheduleId);
      }

      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked, 
        posted 
      }) 
    } catch (error) {
      yield call(displayErrorMessage, error, SCHEDULE_FETCH_HOME)
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
          // displayMessage('A schedule has been removed, do check booked or posted schedules.');
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
      if (action.isBooked === 1) {
        yield call([userRef, userRef.update], {[`bookedSchedules.${scheduleId}`]: deleteField()})
        displayMessage("A booked schedule was removed by its poster");
      } 
        // else if (action.isBooked === -1) {
        // yield call([userRef, userRef.update], {[`postedSchedules.${scheduleId}`]: deleteField()})
        // displayMessage("You have removed a schedule");
    // delete from Algolia
    // yield call([schedule_index, schedule_index.deleteObject], scheduleId)
    } catch (error) {
      yield call(displayErrorMessage, error, REMOVE_SCHEDULE);
  }
  })

  yield takeEvery(CANCEL_SCHEDULE, function*(action){
    try {
      const uid = firebase.auth().currentUser.uid;
      const scheduleId = action.scheduleId;
      const userRef = db.collection('users').doc(uid);
      const scheduleRef =  db.collection('trainer_schedules').doc(scheduleId);
      // for (const booker in scheduleRef.bookers) {
      //   // un book for bookers will haver permission error
      //   const bookerRef = db.collection('users').doc(booker.uid);
      //   yield call([bookerRef, bookerRef.update], {[`bookedSchedules.${scheduleId}`]: deleteField()})
      // }
      // un post schedule
      yield call([userRef, userRef.update], {[`postedSchedules.${scheduleId}`]: deleteField()})
      // delete document
      yield call([scheduleRef, scheduleRef.delete]);
      // delete from Algolia
      yield call([schedule_index, schedule_index.deleteObject], scheduleId)
      displayMessage("You have removed a schedule");
      yield put({ type: CANCEL_SCHEDULE_SUCCESS, scheduleId })
    } catch (error) {
      yield call(displayErrorMessage, error, CANCEL_SCHEDULE);
  }
  })

  yield takeLeading(BOOK_SCHEDULE, function*(action){
    try {
      const scheduleId = action.scheduleId;
    const uid = firebase.auth().currentUser.uid;
    const offer = { ...action.offer, uid };
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

}

export default scheduleSaga;