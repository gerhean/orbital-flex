import { SCHEDULE_UPDATE, SCHEDULE_RESET, SCHEDULE_FETCH } from "./actionTypes";
import firebase from "firebase";
import db from "../firebase";

export const scheduleUpdate = ({ prop, value }) => {
  return {
    type: SCHEDULE_UPDATE,
    payload: { prop, value }
  };
};

// asynchronous action?
// export const scheduleCreate = ({ name, contact, time, location, specialty, price }) => {
//     const currentUserUid = firebase.auth().uid;
//     return (dispatch) => {
//         //trainer_schedules have users(trainers), users can post schedules
//         db.collection("trainer_schedules").add({
//             name : name,
//             contact: contact,
//             time: time,
//             location: location,
//             specialty: specialty,
//             price: price,
//             userIdentification: currentUserUid // possibly used later on to track whoever posted this
//         }).then(
//             () => dispatch({ type: SCHEDULE_RESET })
//             // need to navigate back to home page/search page     !
//             )
//     };
// }

export const scheduleCreate = (schedule, successCallback) => {
  return {
    type: SCHEDULE_CREATE,
    payload: schedule,
    successCallback
  };
};

// asynchronous action again, need to use redux thunk
export const schedulesFetch = () => {
  return dispatch => {
    db.collection("trainer_schedules")
      .get()
      .onSnapshot(
        querySnapshot => {
          dispatch({ type: SCHEDULE_FETCH, payload: querySnapshot.data() });
        } // not sure what .data() gives, needs to console log, then use it in Schedules.js
      );
  };
};
