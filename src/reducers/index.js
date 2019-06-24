// here is my reducers file. i don't want any confusion
import { combineReducers } from "redux";
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import * as actionTypes from "../actions/actionTypes";
import loginReducer from "./loginReducer";
import ScheduleFormReducer from "./ScheduleFormReducer";
import ScheduleReducer from "./scheduleReducer";
import initialState from './state';

export { initialState };

export default combineReducers({
	main: mainReducer,
  auth: loginReducer,
  scheduleForm: ScheduleFormReducer,
  schedule: ScheduleReducer
});

export const mainReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SCREEN:
      return {
        ...state,
        screen: action.screen
      };

    default:
      return state;
  }
};

export default loginReducer;
