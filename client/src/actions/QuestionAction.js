import axios from 'axios'
import {QUESTION_ERROR, GET_QUESTIONS, GET_TOP_QUESTIOS, GET_QUESTION_DETAILS, GET_QUESTION_ANSWERS, GET_QUESTION_COMMENTS, GET_SUBMITED_ANSWERS, GET_SUBMITED_COMMENT, PROFILE_ERROR} from '../actions/Type'
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
export const getTopQuestions = () => async dispatch =>{
    axios.get('http://localhost:5000/api/topquestions')
    .then(res => dispatch({
        type:GET_TOP_QUESTIOS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err
    }))
}
export const getQuestionsDetails = (id) => async dispatch => {
    axios.get('http://localhost:5000/api/questiondetails/'+id)
    .then(res => dispatch({
        type:GET_QUESTION_DETAILS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err
    }))
}
export const getQuestionAnswer = (qtnid) => async dispatch => {
    axios.get(`http://localhost:5000/api/questiondetails/answers/${qtnid}`)
    .then(res => dispatch({
        type:GET_QUESTION_ANSWERS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err
    }) )
}
export const getQuestionComments = (qtnid) => async dispatch => {
    axios.get(`http://localhost:5000/api/questiondetails/comments/${qtnid}`)
    .then(res => dispatch({
        type:GET_QUESTION_COMMENTS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err
    }))
}
export const submitAnswer = (userData) => async dispatch => {
    axios.post('http://localhost:5000/api/questiondetails/answers',userData)
    .then(res => dispatch({
        type:GET_SUBMITED_ANSWERS,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err.response.data
    }))
}
export const submitComment = (userData) => async dispatch =>{
    axios.post('http://localhost:5000/api/questiondetails/comments',userData)
    .then(res => dispatch({
        type:GET_SUBMITED_COMMENT,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:QUESTION_ERROR,
        payload:err.response.data
    }))
}