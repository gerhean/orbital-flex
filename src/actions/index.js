import * as actionTypes from "./actionTypes";

export * from "./loginActions";
export * from "./scheduleActions";
export * from "./userActions";
export * from "./chatActions";

export const changeScreen = (screen) => ({
  type: actionTypes.CHANGE_SCREEN,
  screen
});

export const changePreviousScreen = () => ({
	type: actionTypes.CHANGE_PREVIOUS_SCREEN,
})
