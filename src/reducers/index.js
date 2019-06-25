// here is my reducers file. i don't want any confusion
import { combineReducers } from "redux";
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import * as actionTypes from "../actions/actionTypes";
import loginReducer from "./loginReducer";
import ScheduleReducer from "./scheduleReducer";
import initialState from './state';

export { initialState };

const initialAuth = {
  error: "",
  isLoading: false,
  isAuthenticated: false
};

export default mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_INITIALIZE:
      return {
        ...state,
        auth: initialAuth
      };

    case actionTypes.LOGIN_SUCCESS:
      console.log(action.user);
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true
        },
        user: action.user,
        screen: "Home"
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState,
        auth: initialAuth
      };

    case actionTypes.SIGNUP_INITIALIZE:
      return {
        ...state,
        auth: initialAuth
      };

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true
        },
        user: action.user,
        screen: "Home"
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        auth: {
          ...initialAuth,
          error: action.error.message
        }
      };

    case actionTypes.SCHEDULE_FETCH_HOME_SUCCESS:
      return {
        ...state,
        postedSchedules: action.posted,
        bookedSchedules: action.booked
      };

    case actionTypes.SCHEDULE_CREATE_SUCCESS:
      return {
        ...state,
        postedSchedules: state.postedSchedules.concat([action.payload]),
      };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case actionTypes.CHANGE_SCREEN:
      return {
        ...state,
        screen: action.screen
      };

    default:
      return state;
  }
};

// export default combineReducers({
// 	main: mainReducer,
//   auth: loginReducer,
//   schedule: ScheduleReducer
// });

