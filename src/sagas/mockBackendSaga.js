import { Toast } from 'native-base';
import { takeLatest, takeEvery, put, call, takeLeading } from "redux-saga/effects";
import { 
  LOGIN_EMAIL,
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
  FETCH_SCHEDULE, 
  FETCH_SCHEDULE_SUCCESS
} from '../actions/actionTypes';

const mockUser = {
  username: "test",
  contact: "",
  about: "I'm just a random person",
  profilePic: "",
  gender: 0,
  bookedSchedules: {"A": true},
  postedSchedules: {"B": true},
};

// const publicUserInfo = {
//   uid: 'id',
//   name: 'somebody',
//   profilePic: '',
//   contact: '',
// }

const mockSchedule = {
  id: "A", // id in firestore database
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
  isBooked:0,
}

const mockSchedule2 = {
  id: "B", // id in firestore database
  name: "my random schedule",
  poster: "id",
  posterName: "my name",
  booker: {},
  image: '',
  location: 'Myself',
  day: 0,
  timeStart: 823,
  timeEnd: 912,
  price: '-99',
  services: 'Play',
  remarks: 'Its joke',
  timeCreated: '1111',
  isBooked:-1,
}

function* mockBackendSaga() {

  yield takeEvery(SIGNUP_INITIALIZE, function*(action) {
    try {
      yield put({ type: SIGNUP_SUCCESS, user: mockUser });
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call(displayErrorMessage, error)
    }
  });

  yield takeLeading(LOGIN_EMAIL, function*(action){
    try {
      yield put({ type: LOGIN_INITIALIZE });
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield put({ type: LOGIN_FAIL, error: error_message });
      yield call(displayErrorMessage, error, LOGIN_EMAIL);
    }
  })

  yield takeEvery(LOGIN_INITIALIZE, function*(action) {
    try {
      yield put({ type: LOGIN_SUCCESS, user: mockUser });
    } catch (error) {
      yield put({ type: LOGIN_FAIL, error: error_message });
      yield call(displayErrorMessage, error)
    }
  });

  yield takeEvery(LOGOUT, function*(action){
    console.log("LOGOUT called")
    try {
      yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
      // yield put({ type: SIGNUP_FAIL, error: error_message });
      yield call(displayErrorMessage, error)
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
      console.log('fetching schedule');
      yield put({ type: FETCH_SCHEDULE_SUCCESS, id: "A", schedule: mockSchedule });
      yield put({ type: FETCH_SCHEDULE_SUCCESS, id: "B", schedule: mockSchedule2 });
      yield put({ type: SCHEDULE_FETCH_HOME_SUCCESS, 
        booked: ["A"], 
        posted: ["B"] 
      }) 
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error)
    }
  })

  yield takeEvery(FETCH_SCHEDULE, function*(action){
    yield call(displayErrorMessage, {code: "?", message:"mockbackend does not support this function"}, FETCH_SCHEDULE);
  })

  yield takeEvery(UPDATE_USER_INFO, function*(action){
    try {
      yield put({ type: UPDATE_USER_INFO_SUCCESS, userInfo: action.userInfo })
      yield call(displayMessage, "User Info Updated");
    } catch (error) {
      const error_message = { code: error.code, message: error.message };
      yield call(displayErrorMessage, error)
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
