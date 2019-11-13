import {QUESTION_ERROR} from '../actions/Type'
const initialSatet={
    errors:{}
}

export default function (state = initialSatet,action){
        switch (action.type) {
            case QUESTION_ERROR:
                return{
                        ...state,
                        errors:action.payload
                }
            default:
                return state
        }
}