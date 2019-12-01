import {GET_ERROR, PROFILE_ERROR} from '../actions/Type'
const initialSatet={
    errors:{}
}

export default function (state = initialSatet,action){
        switch (action.type) {
            case PROFILE_ERROR:
                return{
                        ...state,
                        errors:action.payload
                }
            default:
                return state
        }
}
