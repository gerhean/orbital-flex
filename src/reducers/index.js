// here is my reducers file. i don't want any confusion
import { combineReducers } from 'redux'
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
// import loginReducer from './loginReducer'

// export default combineReducers({
//     auth: loginReducer
// })

import * as actionTypes from "../actions/actionTypes";

const mockUser = {
	username: "test",
  about: "I'm just a random person",
	email: "test@test.com",
	profilePic: "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png",
  isTrainer: false
}

const mockTrainer = {
  specialty: "Strongest Hero",
  cost: 0,
  location: "Area Z",
  moreInfo: "AKA caped baldy"
}

const initialAuth = {
  error: '',
  isLoading: false,
  isAuthenticated: false,
}

export const initialState = {
	auth: initialAuth,
  userInfo: mockUser,
  trainerInfo: undefined,
};

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_MOCK:
      return {
        ...state,
        userInfo: mockUser,
      }

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
            isAuthenticated: true,
          }
      };

    case actionTypes.LOGOUT: 
      return {
          ...initialState,
          auth: {
            ...state.auth,
            isAuthenticated: false,
          }
      };

    case actionTypes.SIGNUP_INITIALIZE:
      return {
        ...state,
        auth: initialAuth,
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        auth: {
          ...initialAuth,
          error: action.error.message,
        },
      };
    default:
      return state;
    }
};