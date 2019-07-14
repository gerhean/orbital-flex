import * as actionTypes from "./actionTypes";

export const startChat = schedule => {
    type: actionTypes.CHATROOM_CREATE,
    schedule
}

export const fetchChat = user => {
    type: actionTypes.UPDATE_USER_ROOMS,
    user
}

export const enterRoom = room => {
    type: actionTypes.FETCH_ROOM,
    room
}

// message to be an object as specified in gifted chat
export const sendMessage = message => {
    type: actionTypes.SEND_MESSAGE,
    message
}