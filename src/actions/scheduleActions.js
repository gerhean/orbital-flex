import * as actionTypes from "./actionTypes";

export const scheduleCreate = (schedule, imageLocal) => {
  return {
    type: actionTypes.SCHEDULE_CREATE,
    payload: schedule,
    imageLocal
  };
};

export const scheduleUpdate = (schedule, imageLocal) => { 
	return {
		type: actionTypes.SCHEDULE_UPDATE,
		schedule,
    imageLocal
	}
}

export const cancelSchedule = scheduleId => {
  return {
    type: actionTypes.CANCEL_SCHEDULE,
    scheduleId
  }
}

export const scheduleFetchHome = (user = undefined) => {
	return {
		type: actionTypes.SCHEDULE_FETCH_HOME,
		user
	}
}

export const fetchSchedule = (scheduleId, isBooked = undefined) => ({
  type: actionTypes.FETCH_SCHEDULE,
  scheduleId,
  isBooked
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
