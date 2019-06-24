import * as actionTypes from "./actionTypes";

// export const attemptLogin = () => ({
//     type: actionTypes.LOGIN_INITIALIZE
// });

export const loginInitialize = (user) => ({
  type: actionTypes.LOGIN_INITIALIZE,
  user,
});

export const loginSuccess = data => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data
});

export const loginFail = error => ({
  type: actionTypes.LOGIN_FAIL,
  error: error
});

export const loginMock = () => ({
  type: actionTypes.LOGIN_MOCK
});

export const signupInitialize = (user) => ({
  type: actionTypes.SIGNUP_INITIALIZE,
  user
});

export const logout = () => ({
  type: actionTypes.LOGOUT
})

//INITIALIZE APP
// this isn't done, no try/catch and LOGIN_FAIL isn't hooked up
// but you get the idea
// if a valid JWT is detected, they will be navigated to WeLoggedIn
// export const initializeApp = () => {
//   return async dispatch => {
//     dispatch({ type: INITIALIZE_APP });

//     const user = await AsyncStorage.getItem("token").catch(error =>
//       dispatch({ type: LOGIN_FAIL, payload: error })
//     );

//     if (!user) return dispatch({ type: LOGIN_FAIL, payload: "No Token" });

//     return dispatch({
//       type: LOGIN_SUCCESS,
//       payload: user
//     });
//     // navigation.navigate('WeLoggedIn')
//     // pass navigation into this function if you want
//   };
// };
