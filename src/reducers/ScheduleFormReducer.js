import SCHEDULE_UPDATE from '../actions/actionTypes';

const INITIAL_STATE = {
    name: "",
    contact: "",
    schedule_location: "",
    specialty_price: ""
};

export default ScheduleFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCHEDULE_UPDATE:
            return {
                 ...state, 
                [action.payload.prop]: action.payload.value // key interpolation
            }
        default:
            return state
    }
}