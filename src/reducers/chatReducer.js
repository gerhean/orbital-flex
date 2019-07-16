import * as actionTypes from "../actions/actionTypes";

export default chatReducer = {
  [actionTypes.FETCH_CHATROOMS_SUCCESS]: (state, action) => ({
    ...state,
    chat: {
      ...state.chat,
      chatroomArr: Object.keys(state.chat.chatroomArr),
    }
  }),

  [actionTypes.CHATROOM_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    screen: "ChatRoom",
    chat: {
      ...state.chat,
      chatroomArr: state.chat.chatroomArr.concat([action.roomId]),
      chatrooms: {
        ...state.chat.chatrooms,
        [action.roomId]: action.chatroom,
      },
      hasChatWith: {
        ...state.chat.hasChatWith,
        [action.chatroom.otherUid]: action.roomId
      }
    }
  }),
  
  [actionTypes.FETCH_MESSAGES_SUCCESS]: (state, action) => ({
    ...state,
    screen: "ChatRoom",
    chat: {
      ...state.chat,
      chatrooms: {
        ...state.chat.chatrooms,
        [action.roomId]: action.chatroom,
      }
    }
  }),

  [actionTypes.SEND_MESSAGE_SUCCESS]: (state, action) => {
    const chatroom = state.chat.chatrooms[action.roomId];
    return {
      ...state,
      chat: {
        ...state.chat,
        chatrooms: {
          ...state.chat.chatrooms,
          [action.roomId]: {
            ...chatroom,
            messages: chatroom.messages.concat(action.message)
          },
        }
      }
    }
  }
};