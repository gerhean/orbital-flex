// here is my reducers file. i don't want any confusion
import { combineReducers } from 'redux'
// this is a standard reducer, same as you've been using since kindergarten
// with action types like LOGIN_SUCCESS, LOGIN_FAIL
import loginReducer from './login_reducer'

export default combineReducers({
    auth: loginReducer
})