import {GET_ERROR, GET_TYPE, SET_USER} from '../actions/Type'
import is_empty from '../helper/is_empty'
const initialState={
    user:{},
    types:[],
    errors:{},
    isAuthenticated:false
}
export default function(state = initialState,actions){
    switch (actions.type) {
        case GET_ERROR:
                return{
                        ...state,
                        errors:actions.payload
                }
        case GET_TYPE:
                return{
                        ...state,
                        types:actions.payload        
                }
        case SET_USER:
                return{
                        ...state,
                        isAuthenticated:!is_empty(actions.payload),
                        user:actions.payload
                }
        default:
           return state
    }
}
