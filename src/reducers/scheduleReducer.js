import { 
	SCHEDULE_FETCH, 
	SCHEDULE_FETCH_HOME,
	SCHEDULE_FETCH_HOME_SUCCESS 
} from "../actions/actionTypes";

import initialState from './state';

// const INITIAL_STATE =  ?  whatever is fetched from firebase;

export default scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_FETCH_HOME_SUCCESS:
      return {
      	...state,
      	postedSchedules: action.posted,
      	bookedSchedules: action.booked
      };
    default:
      return state;
  }
};
