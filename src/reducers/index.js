// here is my reducers file. i don't want any confusion
import { combineReducers } from "redux";
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import * as actionTypes from "../actions/actionTypes";
import initialState from './state';

export { initialState };

const initialAuth = () => ({
  error: "",
  isLoading: false,
  isAuthenticated: false
});

export default mainReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.INITIALIZE_APP_SUCCESS:
      return {
        ...state,
        initializingApp: false
      }

    case actionTypes.LOGIN_SUCCESS:
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
      // console.log("LOGOUT_SUCCESS" + " called");
      return {
        ...initialState,
        initializingApp: false,
        screen: "Login"
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
        postedSchedules: state.postedSchedules.concat([action.schedule]),
        user: {
          ...state.user,
          postedScheduleIds: state.user.postedScheduleIds[action.scheduleId] = true,
        }
      };

    case actionTypes.SET_SCHEDULE_EDIT_INDEX:
      return {
        ...state,
        editScheduleIndex: action.payload
      };

    case actionTypes.SCHEDULE_UPDATE_SUCCESS:
      const postedSchedules = state.postedSchedules;
      postedSchedules[state.editScheduleIndex] = action.schedule; 
      return {
        ...state,
        postedSchedules,
        editScheduleIndex: -1,
      };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userInfo
        }
      };

    case actionTypes.FETCH_USER_INFO_SUCCESS:
      let users = state.users;
      if (Object.keys(state.users).length > 15) {
        users = {}
      }
      users =  {
        ...users,
        [action.uid]: action.user
      } 
      return {
        ...state,
        users
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

