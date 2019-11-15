import {QUESTION_ERROR, GET_QUESTIONS} from '../actions/Type'
const initialSatet={
    errors:{},
    questions:[]
}

export default function (state = initialSatet,action){
        switch (action.type) {
            case QUESTION_ERROR:
                return{
                        ...state,
                        errors:action.payload
                }
            case GET_QUESTIONS:
                return{
                    ...state,
                    questions:action.payload
                }
            default:
                return state
        }
}