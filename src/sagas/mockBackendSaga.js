import { Toast } from 'native-base';
import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { 
  INITIALIZE_APP,
  INITIALIZE_APP_SUCCESS,
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
  SCHEDULE_FETCH_HOME_SUCCESS,
  SCHEDULE_UPDATE,
  SCHEDULE_UPDATE_SUCCESS,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  FETCH_USER_INFO,
  FETCH_USER_INFO_SUCCESS
} from '../actions/actionTypes';
import * as actionTypes from "../actions/actionTypes";

const mockUser = {
  username: "test",
  contact: "",
  about: "I'm just a random person",
  profilePic: "",
  gender: 0,
  bookedScheduleIds: {},
  postedScheduleIds: {},
};

const publicUserInfo = {
  uid: 'id',
  name: 'somebody',
  profilePic: '',
  contact: '',
}

const mockSchedule = {
  id: 1, // id in firestore database
  name: "some random schedule",
  poster: "some uid",
  posterName: "some name",
  booker: {},
  image: '',
  location: 'Rainbow',
  day: 0,
  timeStart: 723,
  timeEnd: 812,
  price: '1 million',
  services: 'Gym',
  remarks: 'Its joke',
  timeCreated: '1111',
}

function* mockBackendSaga() {

  yield takeEvery(INITIALIZE_APP, function*(action){
    try {
      yield put({ type: INITIALIZE_APP_SUCCESS });
    } catch (error) {
      yield call(displayErrorMessage, error, INITIALIZE_APP);
    }
  })

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
      const schedule = {
        ...action.payload,
        poster: 0, 
        bookers: []
      }
      yield put({ type: SCHEDULE_CREATE_SUCCESS, schedule, scheduleId: "someId"}) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      // yield put({ type: SCHEDULE_CREATE_FAIL, error: error_message });
      yield call(displayErrorMessage, error, SCHEDULE_CREATE)
    }
  })

  yield takeEvery(SCHEDULE_UPDATE, function*(action){
    try {
      yield put({ type: SCHEDULE_UPDATE_SUCCESS, schedule: action.schedule })
      yield call(displayMessage, "Schedule Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error, SCHEDULE_UPDATE);
    }
  })

  yield takeEvery(SCHEDULE_FETCH_HOME, function*(action){
    try {
      // trainer_schedules have users(trainers), users can post schedules
      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked: [mockSchedule, mockSchedule], 
        posted: [mockSchedule, mockSchedule] 
      }) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call([displayErrorMessage], error)
    }
  })

  yield takeEvery(UPDATE_USER_INFO, function*(action){
    try {
      yield put({ type: UPDATE_USER_INFO_SUCCESS, userInfo: action.userInfo })
      yield call([displayErrorMessage], "User Info Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call([displayErrorMessage], error)
    }
  })
}

const displayErrorMessage = (error, location = '') => {
  console.log(error.message + ". Error at: " + location);
  Toast.show({ text: "Error " + error.code + ": " + error.message, duration: 4000 });
}

const displayMessage = (message) => {
  Toast.show({ text: message })
}

export default mockBackendSaga;
