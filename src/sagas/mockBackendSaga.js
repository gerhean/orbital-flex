import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import {
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_INITIALIZE,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../actions/actionTypes";

function* mockBackendSaga() {
  yield takeEvery(SIGNUP_INITIALIZE, function*(action) {
    try {
      yield put({ type: SIGNUP_SUCCESS, payload: result });
      yield action.successCallback();
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: SIGNUP_FAIL, error: error_message });
    }
  });

  yield takeEvery(LOGIN_INITIALIZE, function*(action) {
    try {
      yield put({ type: LOGIN_SUCCESS, payload: result });
      yield action.successCallback();
    } catch (error) {
      console.log(error.message);
      const error_message = { code: error.code, message: error.message };
      yield put({ type: SIGNUP_FAIL, error: error_message });
    }
  });
}

export default mockBackendSaga;
