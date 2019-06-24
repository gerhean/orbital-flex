import SCHEDULE_UPDATE, { SCHEDULE_RESET } from "../actions/actionTypes";

const INITIAL_STATE = {
  name: "",
  contact: "",
  time: "",
  location: "",
  specialty: "",
  price: ""
};

export default ScheduleFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULE_UPDATE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value // key interpolation
      };
    case SCHEDULE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
