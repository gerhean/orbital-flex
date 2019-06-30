import * as actionTypes from "./actionTypes";

export const viewUserProfile = uid => ({
	type: actionTypes.VIEW_USER_PROFILE,
	uid,
})