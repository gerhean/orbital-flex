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
    screen: "Home",
    screenHistory: ["Home"]
  }),

  [actionTypes.FETCH_USER_INFO_SUCCESS]: (state, action) => {
    const now = Date.now();
    const uid = action.uid;
    const users = objFilter(
      state.users, 
      user => now - user.timeFetched < 432000000 
    )
    if (users[uid]) {
      users[uid] = {
        ...users[uid],
        ...action.user
      };
    } else {
      users[uid] = action.user;
    }
    return {
      ...state,
      users
    }
  },

  [actionTypes.ADD_USER_REVIEW_SUCCESS]: (state, action) => {
    const uid = action.uid;
    const users = {
      ...state.users,
      [uid]: {
        ...state.users[uid],
        ownReview: action.review,
      }
    }
    return {
      ...state,
      users
    }
  },

  [actionTypes.FETCH_USER_REVIEWS_SUCCESS]: (state, action) => {
    const uid = action.uid;
    if (uid === state.user.uid) {
      return {
        ...state,
        user: {
          ...state.user,
          reviews: action.reviews,
          timeFetchedReview: Date.now()
        }
      }  
    } else { 
      return {
        ...state,
        users: {
          ...state.users,
          [uid]: {
            ...state.users[uid],
            reviews: action.reviews,
            ownReview: action.ownReview,
            timeFetchedReview: Date.now()
          }
        }
      }
    }
  },

  [actionTypes.FOLLOW_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      followedUsers: {
        ...state.user.followedUsers,
        [action.uid]: true
      }
    }
  }),

  [actionTypes.UNFOLLOW_USER_SUCCESS]: (state, action) => {
    const {[action.uid]: value, ...followedUsers} = state.user.followedUsers;
    return {
      ...state,
      user: {
        ...state.user,
        followedUsers
      }
    }
  },

}