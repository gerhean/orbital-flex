// here is my reducers file. i don't want any confusion
import { combineReducers } from "redux";
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import * as actionTypes from "../actions/actionTypes";
import initialState from './state';
export { initialState };

const initialAuth = () => ({
  error: "",
  isAuthenticated: false
});

export default mainReducer = (state = initialState(), action) => {
  switch (action.type) {

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
      return initialState();

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
          ...initialAuth(),
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
      state.schedules[action.scheduleId] = action.schedule;
      return {
        ...state,
        postedSchedules: state.postedSchedules.concat([action.scheduleId]),
        user: {
          ...state.user,
          postedScheduleIds: state.user.postedScheduleIds[action.scheduleId] = true,
        },
        screen: "Home"
      };

    case actionTypes.SET_SCHEDULE_EDIT_INDEX:
      return {
        ...state,
        editScheduleIndex: action.payload,
        screen: "EditSchedule"
      };

    case actionTypes.SCHEDULE_UPDATE_SUCCESS: 
      state.schedules[action.scheduleId] = {
        ...state.schedules[action.scheduleId],
        ...action.schedule
      };
      console.log(state.schedules)
      return {
        ...state,
        editScheduleIndex: -1,
        screen: "Home"
      };

    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userInfo
        },
        screen: "Home"
      };

    case actionTypes.FETCH_USER_INFO_SUCCESS:
      let users = state.users;
      if (Object.keys(users).length > 30) {
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

    case actionTypes.FETCH_SCHEDULE_SUCCESS:
      state.schedules[action.id] = action.schedule;
      return state;

    case actionTypes.BOOK_SCHEDULE_SUCCESS:
      state.schedules[action.scheduleId].isBooked = 1;
      return state;

    case actionTypes.VIEW_USER_PROFILE:
      return {
        ...state,
        screen: "UserProfile",
        userProfileToView: action.uid
      }

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

