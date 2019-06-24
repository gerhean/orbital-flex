import * as actionTypes from "./actionTypes";

export * from "./loginActions";
export * from "./ScheduleActions";

export const changeScreen = (screen) => ({
  type: actionTypes.CHANGE_SCREEN,
  screen
});