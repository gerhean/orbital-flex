import * as actionTypes from "../actions/actionTypes";

const objFilter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

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
    const now = Date.now();
    const users = objFilter(
      state.users, 
      user => now - user.timeFetched < 2000000 
    )
    users[action.uid] = action.user
    return {
      ...state,
      users
    }
  },

}