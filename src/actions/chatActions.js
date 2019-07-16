import * as actionTypes from "./actionTypes";

export const fetchRooms = () => ({
    type: actionTypes.FETCH_CHATROOMS
});

export const startChat = otherUid => ({
    type: actionTypes.OPEN_CHAT,
    otherUid
});

export const createChat = (text, otherUid) => ({
    type: actionTypes.CHATROOM_CREATE,
    text,
    otherUid
});

// export const enterRoom = room => ({
//     type: actionTypes.FETCH_ROOM,
//     room
// });

export const sendMessage = payload => ({
    type: actionTypes.SEND_MESSAGE,
    payload
});