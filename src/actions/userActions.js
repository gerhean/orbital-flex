import * as actionTypes from "./actionTypes";

export const updateUserInfo = (userInfo) => ({
  type: actionTypes.UPDATE_USER_INFO,
  userInfo
});

export const fetchUserReviews = (uid) => ({
  type: actionTypes.FETCH_USER_REVIEWS,
  uid
});

export const addUserReview = (uid, text, rating) => ({
  type: actionTypes.ADD_USER_REVIEW,
  uid, 
  text, 
  rating
});

export const followUser = (uid) => ({
  type: actionTypes.FOLLOW_USER,
  uid
});

export const unfollowUser = (uid) => ({
  type: actionTypes.UNFOLLOW_USER,
  uid
});