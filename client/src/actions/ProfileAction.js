import {SET_USER, GET_ERROR, PROFILE_ERROR} from '../actions/Type'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../helper/set_authtoken'

export const updateProfile = (userData,history) =>async dispatch =>{
    var url = '';
    if(userData.type === 'firstname'){
        url = 'http://localhost:5000/api/profile/name';
    }else if(userData.type === 'lastname'){
        url = 'http://localhost:5000/api/profile/lname';
    }else if(userData.type === 'email'){
        url = 'http://localhost:5000/api/profile/email';
    }
    axios.post(url,userData)
    .then(res => {

        const {token} = res.data
        localStorage.removeItem('jwttoken');
        localStorage.setItem('jwttoken',token);
        setAuthToken(token);
        const decode= jwt_decode(token);
        dispatch({
                type:SET_USER,
                payload:decode
        })
})
    .catch(err => 
        dispatch({
                type:PROFILE_ERROR,
                payload:err.response.data
        })
    )
}
export const uploadImage = (userData)=>async dispatch =>{
    axios.post('http://localhost:5000/api/profile/upload',userData)
    .then(res => {
        const {token} = res.data
        localStorage.removeItem('jwttoken');
        localStorage.setItem('jwttoken',token);
        setAuthToken(token);
        const decode= jwt_decode(token);
        dispatch({
                type:SET_USER,
                payload:decode
        })
    })
    .catch(err => 
        
        dispatch({
        type:PROFILE_ERROR,
        payload:err.response.data
}))
}