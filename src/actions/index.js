import * as actionTypes from "./actionTypes";

export * from "./loginActions";
export * from "./scheduleActions";
export * from "./searchActions";
export * from "./chatActions";

export const changeScreen = (screen) => ({
  type: actionTypes.CHANGE_SCREEN,
  screen
});

export const changePreviousScreen = () => ({
	type: actionTypes.CHANGE_PREVIOUS_SCREEN,
})

export const updateUserInfo = (userInfo) => ({
  type: actionTypes.UPDATE_USER_INFO,
  userInfo
});

export const fetchUserReviews = (uid) => ({
  type: actionTypes.FETCH_USER_REVIEWS,
  uid
});

export const addUserReviews = (uid, text, rating) => ({
  type: actionTypes.ADD_USER_REVIEW,
  uid, 
  text, 
  rating
});