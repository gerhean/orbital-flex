import * as actionTypes from "./actionTypes";

export const fetchChat = user => {
    type: actionTypes.UPDATE_USER_ROOMS,
    user
}

export const enterRoom = room => {
    type: actionTypes.FETCH_ROOM,
    room
}