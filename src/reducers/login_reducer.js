import { 
  INITIALIZE_APP,
  CHECK_REMEMBER_ME,
  TOGGLE_REMEMBER_ME,
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: 
      return {
          ...initialState,
          isAuthenticated: false,
      };
    default:
      return state;
    }
};

export default rootReducer;