import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { 
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_INITIALIZE, 
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  SCHEDULE_CREATE,
  SCHEDULE_CREATE_SUCCESS,
  SCHEDULE_FETCH_HOME,
  SCHEDULE_FETCH_HOME_SUCCESS
} from '../actions/actionTypes';
import * as actionTypes from "../actions/actionTypes";

const mockUser = {
  username: "test",
  about: "I'm just a random person",
  email: "test@test.com",
  profilePic: "https://i.stack.imgur.com/l60Hf.png"
};

function* mockBackendSaga() {
  yield takeEvery(SIGNUP_INITIALIZE, function*(action) {
    try {
      yield put({ type: SIGNUP_SUCCESS, user: mockUser });
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call([displayErrorMessage], error)
    }
  });

  yield takeEvery(LOGIN_INITIALIZE, function*(action) {
    try {
      yield put({ type: LOGIN_SUCCESS, user: mockUser });
    } catch (error) {
      console.log(error.message);
      const error_message = { code: error.code, message: error.message };
      yield put({ type: LOGIN_FAIL, error: error_message });
      yield call([displayErrorMessage], error)
    }
  });

  yield takeEvery(LOGOUT, function*(action){
    console.log("LOGOUT called")
    try {
      yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
      // yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call([displayErrorMessage], error)
    }
  })

  yield takeEvery(SCHEDULE_CREATE, function*(action){
    try {
      // trainer_schedules have users(trainers), users can post schedules
      yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule: action.payload }) // need to navigate back to home page/search page
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
      console.log(error.message);
      yield call([displayErrorMessage], error)
    }
  })

  yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
      // trainer_schedules have users(trainers), users can post schedules
      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, booked: [], posted: [] }) // need to navigate back to home page/search page
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
      yield call([displayErrorMessage], error)
    }
  })
}

const displayErrorMessage = (error) => {
  Toast.show({ text: "Error " + error.code + ": " + error.message })
}

export default mockBackendSaga;
