import axios from 'axios'
import {QUESTION_ERROR, GET_QUESTIONS} from '../actions/Type'
export const SubmitQuestion = (userData,history) => async dispatch => {
    axios.post('http://localhost:5000/api/question',userData)
    .then(res => history.push('myquestion'))
    .catch(err => dispatch({
            type:QUESTION_ERROR,
            payload:err.response.data
    }))
}
export const GetMyQuestion = (id) => async dispatch => {
    axios.get('http://localhost:5000/api/question/'+id)
    .then(res => dispatch({
        type:GET_QUESTIONS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err.response.data
    }) )
}