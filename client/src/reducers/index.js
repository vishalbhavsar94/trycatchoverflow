import {combineReducers} from 'redux'
import AuthReducers from './AuthReducer'
import ProfileReducer from './ProfileReducer'
import QuestionReducer from './QuestionReducer'

export default combineReducers({
    auth:AuthReducers,
    profile:ProfileReducer,
    question:QuestionReducer
})