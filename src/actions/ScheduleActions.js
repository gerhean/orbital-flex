import * as actionTypes from "./actionTypes";

export const scheduleCreate = (schedule) => {
  return {
    type: actionTypes.SCHEDULE_CREATE,
    payload: schedule
  };
};

export const setScheduleEditIndex = index => {
  return {
    type: actionTypes.SET_SCHEDULE_EDIT_INDEX,
    payload: index
  };
};

export const scheduleUpdate = schedule => { 
	return {
		type: actionTypes.SCHEDULE_UPDATE,
		schedule
	}
}

export const scheduleFetchHome = (user = undefined) => {
	return {
		type: actionTypes.SCHEDULE_FETCH_HOME,
		user
	}
}

export const fetchSchedule = scheduleId => ({
  type: actionTypes.FETCH_SCHEDULE,
  scheduleId,
});

export const bookSchedule = (scheduleId, offer) => ({
  type: actionTypes.BOOK_SCHEDULE,
  scheduleId,
  offer
});

export const unbookSchedule = scheduleId => ({
  type: actionTypes.UNBOOK_SCHEDULE,
  scheduleId,
});

export const fetchUserInfo = uid => ({
  type: actionTypes.FETCH_USER_INFO,
  uid,
});

// asynchronous action again, need to use redux thunk
// export const schedulesFetch = () => {
//   return dispatch => {
//     db.collection("trainer_schedules")
//       .get()
//       .onSnapshot(
//         querySnapshot => {
//           dispatch({ type: SCHEDULE_FETCH, payload: querySnapshot.data() });
//         } // not sure what .data() gives, needs to console log, then use it in Schedules.js
//       );
//   };
// };

// import firebase from "firebase";
// import db from "../firebase";

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
