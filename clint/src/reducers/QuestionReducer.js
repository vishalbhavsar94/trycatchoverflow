import {QUESTION_ERROR, GET_QUESTIONS, GET_TOP_QUESTIOS, GET_QUESTION_DETAILS, GET_QUESTION_ANSWERS, GET_QUESTION_COMMENTS} from '../actions/Type'
import { stat } from 'fs'
import { get } from 'http'
const initialSatet={
    errors:{},
    questions:[],
    topquestions:[],
    qtndetails:[],
    answers:[],
    comments:[]
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
            case GET_TOP_QUESTIOS:
                return{
                    ...state,
                    topquestions:action.payload
                }
            case GET_QUESTION_DETAILS:
                return{
                    ...state,
                    qtndetails:action.payload
                }
            case GET_QUESTION_ANSWERS:
                return{
                    ...state,
                    answers:action.payload
                }
            case GET_QUESTION_COMMENTS:
                return{
                    ...state,
                    comments:action.payload
                }
            default:
                return state
        }
}