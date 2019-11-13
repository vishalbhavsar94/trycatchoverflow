import axios from 'axios'
import {QUESTION_ERROR} from '../actions/Type'
export const SubmitQuestion = (userData,history) => async dispatch => {
    axios.post('http://localhost:5000/api/question',userData)
    .then(res => history.push('myquestion'))
    .catch(err => dispatch({
            type:QUESTION_ERROR,
            payload:err.response.data
    }))
}