import * as actionTypes from "../actions/actionTypes";

export default chatReducer = {
    [actionTypes.UPDATE_USER_ROOMS_SUCCESS]: (state, action) => ({
        ...state,
        user_rooms: action.user_rooms
    }),
    [actionTypes.FETCH_ROOM_SUCCESS]: (state, action) => ({
        ...state,
        current_room: action.current_room
    }),
    [actionTypes.CHATROOM_CREATE_SUCCESS]: (state, action) => ({
        ...state,
        user_rooms: state.user_rooms.concat([action.chatroom]),
        screen: "ChatRoom",
        current_room: action.chatroom
      }),
      [actionTypes.FETCH_MESSAGES_SUCCESS]: (state, action) => ({
        ...state,
        messages: action.messages
      })
};