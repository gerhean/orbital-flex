import * as actionTypes from "./actionTypes";

export const fetchUserInfo = uid => ({
  type: actionTypes.FETCH_USER_INFO,
  uid,
});