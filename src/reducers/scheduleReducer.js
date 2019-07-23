import * as actionTypes from "../actions/actionTypes";
import firebase from 'firebase';

const objFilter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

export default scheduleReducer = {
	[actionTypes.SCHEDULE_FETCH_HOME_SUCCESS]: (state, action) => ({
    ...state,
    postedSchedules: action.posted,
    bookedSchedules: action.booked
  }),

  [actionTypes.SCHEDULE_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    schedules: {
      ...state.schedules,
      [action.scheduleId]: action.schedule
    },
    postedSchedules: state.postedSchedules.concat([action.scheduleId]),
    user: {
      ...state.user,
      postedScheduleIds: {
        ...state.user.postedSchedules,
        [action.scheduleId]: true
      },
    },
    screen: "Home",
    screenHistory: ["Home"]
  }),

  [actionTypes.SCHEDULE_UPDATE_SUCCESS]: (state, action) => ( {
    ...state,
    schedules: {
      ...state.schedules,
      [action.scheduleId]: {
        ...state.schedules[action.scheduleId],
        ...action.schedule
      }
    },
    editScheduleId: '',
    screen: "Home",
    screenHistory: ["Home"]
  }),

  [actionTypes.FETCH_SCHEDULE_SUCCESS]: (state, action) => {
    const now = Date.now();
    const schedules = objFilter(
      state.schedules, 
      schedule => (now - schedule.timeFetched < 2000000 || schedule.isBooked !== 0)
    )
    schedules[action.id] = action.schedule;
    return {
      ...state,
      schedules
    }
  },

  [actionTypes.REMOVE_SCHEDULE]: (state, action) => {
    const {[action.scheduleId]: value, ...bookedSchedules} = state.user.bookedSchedules;
    const {[action.scheduleId]: value2, ...postedSchedules} = state.user.postedSchedules;
    return {
      ...state,
      user: {
        ...state.user,
        bookedSchedules,
        postedSchedules
      },
      bookedSchedules: Object.keys(bookedSchedules),
      postedSchedules: Object.keys(postedSchedules),
    }
  },

  [actionTypes.CANCEL_SCHEDULE_SUCCESS]: (state, action) => {
    // const {[action.scheduleId]: value, ...bookedSchedules} = state.user.bookedSchedules;
    const {[action.scheduleId]: value, ...postedSchedules} = state.user.postedSchedules;
    const {[action.scheduleId]: value2, ...schedules} = state.schedules;
    return {
      ...state,
      schedules,
      user: {
        ...state.user,
        // bookedSchedules,
        postedSchedules,
      }
    }
  },

  [actionTypes.BOOK_SCHEDULE_SUCCESS]: (state, action) => {
    const uid = firebase.auth().currentUser.uid;
    if (state.user.bookedSchedules[action.scheduleId]) {
      return {
        ...state,
        schedules: {
          ...state.schedule,
          [action.scheduleId]: {
            ...state.schedules[action.scheduleId],
            bookers: {
              ...state.schedules[action.scheduleId].bookers,
              [uid]: action.offer,
            },
            isBooked: 1
          }
        },
      }
    } else {
      return {
        ...state,
        schedules: {
          ...state.schedule,
          [action.scheduleId]: {
            ...state.schedules[action.scheduleId],
            bookers: {
              ...state.schedules[action.scheduleId].bookers,
              [uid]: action.offer,
            },
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
      }
    }
  },

  [actionTypes.UNBOOK_SCHEDULE_SUCCESS]: (state, action) => {
    const {[action.scheduleId]: value, ...bookedSchedules} = state.user.bookedSchedules;
    return {
      ...state,
      schedules: {
        ...state.schedule,
        [action.scheduleId]: {
          ...state.schedules[action.scheduleId],
          isBooked: 0
        }
      },
      bookedSchedules: Object.keys(bookedSchedules),
      user: {
        ...state.user,
        bookedSchedules
      }
    }
  },
}