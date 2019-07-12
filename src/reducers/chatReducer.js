import * as actionTypes from "../actions/actionTypes";

export default chatReducer = {
    [actionTypes.UPDATE_USER_ROOMS_SUCCESS]: (state, action) => ({
        ...state,
        user_rooms: action.user_rooms
    }),
    [actionTypes.FETCH_ROOM_SUCCESS]: (state, action) => ({
        ...state,
        current_room: action.current_room
    })
};