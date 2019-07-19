import * as actionTypes from "./actionTypes";

export const scheduleCreate = (schedule) => {
  return {
    type: actionTypes.SCHEDULE_CREATE,
    payload: schedule
  };
};

export const scheduleUpdate = schedule => { 
	return {
		type: actionTypes.SCHEDULE_UPDATE,
		schedule
	}
}

export const removeSchedule = scheduleId => {
  return {
    type: actionTypes.REMOVE_SCHEDULE,
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
