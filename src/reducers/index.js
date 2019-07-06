// here is my reducers file. i don't want any confusion
import { combineReducers } from "redux";
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import * as actionTypes from "../actions/actionTypes";
import initialState from './state';
export { initialState };

const initialAuth = () => ({
  error: "",
  loading: false,
  isAuthenticated: false
});

export default mainReducer = (state = initialState(), action) => {
  switch (action.type) {

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          error: "",
          loading: false,
          isAuthenticated: true
        },
        user: action.user,
        screen: "Home"
      };

    case actionTypes.LOGOUT_SUCCESS:
      // console.log("LOGOUT_SUCCESS" + " called");
      return {
        ...initialState(),
        auth: initialAuth(),
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
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [action.id]: action.schedule
        },
        postedSchedules: state.postedSchedules.concat([action.scheduleId]),
        user: {
          ...state.user,
          postedScheduleIds: state.user.postedSchedules[action.scheduleId] = true,
        },
        screen: "Home"
      };

    case actionTypes.SET_SCHEDULE_EDIT_INDEX:
      return {
        ...state,
        editScheduleId: action.payload,
        screen: "EditSchedule"
      };

    case actionTypes.SCHEDULE_UPDATE_SUCCESS: 
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [action.scheduleId]: {
            ...state.schedules[action.scheduleId],
            ...action.schedule
          }
        },
        editScheduleId: '',
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
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [action.id]: action.schedule
        }
      };

    case actionTypes.REMOVE_SCHEDULE:
      delete state.user.bookedSchedules[action.scheduleId];
      delete state.user.postedSchedules[action.scheduleId];
      return {
        ...state,
        user: {
          ...state.user,
          bookedSchedules: state.user.bookedSchedules.filter(item => action.scheduleId !== item),
          postedSchedules: state.user.postedSchedules.filter(item => action.scheduleId !== item),
        }
      };

    case actionTypes.BOOK_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: {
          ...state.schedule,
          [action.scheduleId]: {
            ...state.schedules[action.scheduleId],
            isBooked: 1
          }
        },
        bookedSchedules: state.bookedSchedules.concat([action.scheduleId]),
        user: {
          ...state.user,
          bookedSchedules: {
            ...state.user.bookedSchedules,
            [action.scheduleId]: true,
          }
        }
      };

    case actionTypes.UNBOOK_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: {
          ...state.schedule,
          [action.scheduleId]: {
            ...state.schedules[action.scheduleId],
            isBooked: -1
          }
        },
        bookedSchedules: Object.keys(state.user.bookedSchedules),
        user: {
          ...state.user,
          bookedSchedules: state.user.bookedSchedules.filter(item => action.scheduleId !== item),
        }
      };

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

