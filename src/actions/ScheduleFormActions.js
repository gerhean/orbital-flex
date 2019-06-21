import SCHEDULE_UPDATE from './actionTypes';

export const scheduleUpdate = ({ prop, value }) => {
    return {
        type: SCHEDULE_UPDATE,
        payload: { prop, value }
    };
}