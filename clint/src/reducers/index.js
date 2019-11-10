import {combineReducers} from 'redux'
import AuthReducers from './AuthReducer'
import ProfileReducer from './ProfileReducer'

export default combineReducers({
    auth:AuthReducers,
    profile:ProfileReducer
})