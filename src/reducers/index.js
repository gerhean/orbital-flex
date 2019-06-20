// here is my reducers file. i don't want any confusion
import { combineReducers } from 'redux'
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
// import loginReducer from './loginReducer'

// export default combineReducers({
//     auth: loginReducer
// })

import { 
  // INITIALIZE_APP,
  // CHECK_REMEMBER_ME,
  // TOGGLE_REMEMBER_ME,
  // LOGIN_INITIALIZE,
  LOGIN_MOCK,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT
} from "../actions/actionTypes";

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

const mockAuth = {
  isAuthenticated: false,
}

const initialState = {
	auth: mockAuth,
  userInfo: mockUser,
  trainerInfo: undefined,
};

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_MOCK:
      return {
        ...state,
        userInfo: mockUser,
      }
    case LOGIN_SUCCESS: 
      return {
          ...state,
          auth: {
            isAuthenticated: true,
          }
      };
    case LOGOUT: 
      return {
          ...initialState,
          auth: {
            isAuthenticated: false,
          }
      };
    default:
      return state;
    }
};