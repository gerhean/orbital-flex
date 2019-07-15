import * as actionTypes from "../actions/actionTypes";

export default chatReducer = {
  [actionTypes.CHATROOM_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    screen: "ChatRoom",
    chat: {
      ...state.chat,
      chatrooms: {
        ...state.chat.chatrooms,
        [action.roomId]: action.chatroom,
      },
      hasChatWith: {
        ...state.chat.hasChatWith,
        [action.chatroom.otherUid]: true
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