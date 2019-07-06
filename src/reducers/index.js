import * as actionTypes from "../actions/actionTypes";
import initialState from './state';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import scheduleReducer from './scheduleReducer';

export { initialState };

const miscReducer = {
  [actionTypes.CHANGE_SCREEN]: (state, action) => ({
    ...state,
    screen: action.screen
  })
};

const reducerArr = [miscReducer, loginReducer, userReducer, scheduleReducer];

export default mainReducer = (state = initialState(), action) => {
  for (const reducer of reducerArr) {
    const actionHandler = reducer[action.type];
    if (actionHandler) {
      return actionHandler(state, action);
    }
  }
  return state;
};
