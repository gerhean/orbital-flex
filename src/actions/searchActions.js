import * as actionTypes from "./actionTypes";

export const fetchSchedule = scheduleId => ({
  type: actionTypes.FETCH_SCHEDULE,
  scheduleId,
});

export const bookSchedule = scheduleId => ({
  type: actionTypes.BOOK_SCHEDULE,
  scheduleId,
});

export const unbookSchedule = scheduleId => ({
  type: actionTypes.UNBOOK_SCHEDULE,
  scheduleId,
});

export const fetchUserInfo = uid => ({
  type: actionTypes.FETCH_USER_INFO,
  uid,
});

export const viewUserProfile = uid => ({
	type: actionTypes.VIEW_USER_PROFILE,
	uid,
})