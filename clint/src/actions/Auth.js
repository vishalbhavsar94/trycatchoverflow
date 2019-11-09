import {GET_ERROR, GET_TYPE, SET_USER} from './Type'
import axios from 'axios'
import setAuthToken from "../helper/set_authtoken";
import jwt_decode  from 'jwt-decode'

export const getUserType = () => async dispatch => {
        axios.get('http://localhost:5000/api/userType')
        .then(res => 
                   {
                        dispatch({
                        type:GET_TYPE,
                        payload:res.data
        })})
        .catch(err => console.log(err.response.data))
}
export const postRegister = (userData,history) => async dispatch =>{
    axios.post('http://localhost:5000/api/register',userData)
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
                type:GET_ERROR,
                payload:err.response.data
        })
        )
}
export const loginUser = (userData,history) => async dispatch =>{
        axios.post('http://localhost:5000/api/login',userData)
        .then(res=> {
                const {token} = res.data
                localStorage.setItem('jwttoken',token);
                setAuthToken(token);
                const decode= jwt_decode(token);
                dispatch({
                        type:SET_USER,
                        payload:decode
                })
        })
        .catch(err=>  dispatch({
                type:GET_ERROR,
                payload:err.response.data
        }))
}
export const logoutUser = () => async dispatch => {
        localStorage.removeItem('jwttoken');
        setAuthToken(false);
        dispatch({
                type:SET_USER,
                payload:{}
        })
}