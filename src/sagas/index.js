import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { USE_BACKEND } from "../../env.js";
import {
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_INITIALIZE,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../actions/actionTypes";
import backendSaga from "./backendSaga";
import mockBackendSaga from "./mockBackendSaga";

import "firebase/auth";

import firebase from 'firebase'
import { firebaseConfig } from "../../env.js";

firebase.initializeApp(firebaseConfig);

function* mainSaga() {
  yield* USE_BACKEND ? backendSaga() : mockBackendSaga();
}

export default mainSaga;
