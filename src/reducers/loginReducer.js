import * as actionTypes from "../actions/actionTypes";
import initialState from './state';

const initialAuth = () => ({
  error: "",
  loading: false,
  isAuthenticated: false
});

export default loginReducer = {
  [actionTypes.LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    auth: {
      error: "",
      loading: false,
      isAuthenticated: true
    },
    user: action.user,
    screen: "Home",
    screenHistory: ["Home"]
  }),

  [actionTypes.LOGOUT_SUCCESS]: (state, action) => ({
    ...initialState(),
    auth: initialAuth(),
  }),

  [actionTypes.SIGNUP_SUCCESS]: (state, action) => ({
    ...state,
    auth: {
      ...state.auth,
      isAuthenticated: true
    },
    user: action.user,
    screen: "Home",
    screenHistory: ["Home"]
  }),

  [actionTypes.SIGNUP_FAIL]: (state, action) => ({
    ...state,
    auth: {
      ...initialAuth(),
      error: action.error.message
    }
  }),
}