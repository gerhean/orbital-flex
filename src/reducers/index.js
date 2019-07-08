import * as actionTypes from "../actions/actionTypes";
import initialState from './state';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import scheduleReducer from './scheduleReducer';

export { initialState };

export const objFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});

const miscReducer = {
  [actionTypes.CHANGE_SCREEN]: (state, action) => {
    const screen = action.screen;
    let screenHistory;
    if (screen == "Home" || screen == "Login") {
      screenHistory = [screen];
    } else {
      screenHistory = state.screenHistory.concat([screen])
    }
    return {
      ...state,
      screen,
      screenHistory,
    }
  },

  [actionTypes.CHANGE_PREVIOUS_SCREEN]: (state, action) => {
    const length = state.screenHistory.length;
    if (length <= 1) {
      return state;
    }
    const screen = state.screenHistory[length - 2];
    const screenHistory = state.screenHistory.slice(0, length - 1);
    return {
      ...state,
      screen,
      screenHistory
    }
  },
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
