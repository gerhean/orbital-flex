import * as actionTypes from "../actions/actionTypes";

const sortChatrooms = (rooms) => (a, b) => rooms[b].lastMessageTime - rooms[a].lastMessageTime;

export default chatReducer = {
  [actionTypes.FETCH_CHATROOMS_SUCCESS]: (state, action) => ({
    ...state,
    chat: {
      ...state.chat,
      chatroomArr: Object.keys(state.chat.chatrooms)
        .sort(sortChatrooms(state.chat.chatrooms)),
    }
  }),

  [actionTypes.OPEN_CHAT]: (state, action) => {
    const hasExistingChat = state.chat.hasChatWith[action.otherUid];
    let screen = hasExistingChat ? 
      "ChatRoom/" + hasExistingChat 
      : "ChatroomNew/" + action.otherUid;
    return {
      ...state,
      screen
    }
  },

  [actionTypes.CHATROOM_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    screen: "ChatRoom/" + action.roomId,
    chat: {
      ...state.chat,
      chatroomArr: Array.of(action.roomId, ...state.chat.chatroomArr), 
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
            messages: Array.of(action.message, ...chatroom.messages),
            lastMessageTime: Date.now()
          }
        }
      }
    };
  }
};