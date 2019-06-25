import * as actionTypes from "./actionTypes";

export * from "./loginActions";
export * from "./ScheduleActions";

export const initializeApp = () => ({
  type: actionTypes.INITIALIZE_APP,
});

export const changeScreen = (screen) => ({
  type: actionTypes.CHANGE_SCREEN,
  screen
});

export const updateUserInfo = (userInfo) => ({
  type: actionTypes.UPDATE_USER_INFO,
  userInfo
});