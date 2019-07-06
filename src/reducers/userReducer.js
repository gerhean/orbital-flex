import * as actionTypes from "../actions/actionTypes";

export default userReducer = {
	[actionTypes.UPDATE_USER_INFO_SUCCESS]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      ...action.userInfo
    },
    screen: "Home"
  }),

  [actionTypes.FETCH_USER_INFO_SUCCESS]: (state, action) => {
    let users = state.users;
    if (Object.keys(users).length > 30) {
      users = {}
    }
    users =  {
      ...users,
      [action.uid]: action.user
    } 
    return {
      ...state,
      users
    }
  },

  [actionTypes.VIEW_USER_PROFILE]: (state, action) => ({
    ...state,
    screen: "UserProfile",
    userProfileToView: action.uid
  }),
}