import * as actionTypes from "./actionTypes";

export * from "./loginActions";
export * from "./scheduleActions";
export * from "./searchActions";

export const changeScreen = (screen) => ({
  type: actionTypes.CHANGE_SCREEN,
  screen
});

export const updateUserInfo = (userInfo) => ({
  type: actionTypes.UPDATE_USER_INFO,
  userInfo
});