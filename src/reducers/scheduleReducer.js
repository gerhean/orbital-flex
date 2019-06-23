import { SCHEDULE_FETCH } from "../actions/actionTypes";

// const INITIAL_STATE =  ?  whatever is fetched from firebase;

export default scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCHEDULE_FETCH:
            return action.payload;
        default:
            return state;
    }
}