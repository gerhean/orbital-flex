import * as actionTypes from "../actions/actionTypes";

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
      [action.id]: action.schedule
    },
    postedSchedules: state.postedSchedules.concat([action.scheduleId]),
    user: {
      ...state.user,
      postedScheduleIds: state.user.postedSchedules[action.scheduleId] = true,
    },
    screen: "Home"
  }),

  [actionTypes.SET_SCHEDULE_EDIT_INDEX]: (state, action) => ({
    ...state,
    editScheduleId: action.payload,
    screen: "EditSchedule"
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
    screen: "Home"
  }),

  [actionTypes.FETCH_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    schedules: {
      ...state.schedules,
      [action.id]: action.schedule
    }
  }),

  [actionTypes.REMOVE_SCHEDULE]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      bookedSchedules: state.user.bookedSchedules.filter(item => action.scheduleId !== item),
      postedSchedules: state.user.postedSchedules.filter(item => action.scheduleId !== item),
    }
  }),

  [actionTypes.BOOK_SCHEDULE_SUCCESS]: (state, action) => ({
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
  }),

  [actionTypes.UNBOOK_SCHEDULE_SUCCESS]: (state, action) => ({
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
  }),
}