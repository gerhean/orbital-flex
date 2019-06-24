import * as actionTypes from "../actions/actionTypes";
import initialState from "./state";

const mockUser = {
  username: "test",
  about: "I'm just a random person",
  email: "test@test.com",
  profilePic: "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png"
};

const initialAuth = {
  error: "",
  isLoading: false,
  isAuthenticated: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.LOGIN_INITIALIZE:
      return {
        ...state,
        auth: initialAuth
      };

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
      return {
        ...initialState,
        auth: initialAuth
      };

    case actionTypes.SIGNUP_INITIALIZE:
      return {
        ...state,
        auth: initialAuth
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
          ...initialAuth,
          error: action.error.message
        }
      };
    default:
      return state;
  }
};

export default loginReducer;
