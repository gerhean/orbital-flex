import * as actionTypes from "./actionTypes";

export const fetchRooms = () => ({
    type: actionTypes.UPDATE_USER_ROOMS
});

export const startChat = otherUid => ({
    type: actionTypes.CHATROOM_CREATE,
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