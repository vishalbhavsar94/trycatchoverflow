import React, { Component } from 'react'
import NavBarPage from './_Layout/NavBarPage'
import LandingPage from './View/LandingPage'
import Login from './View/Login'
import Register from './View/Register'
import Dashbord from './View/Dashbord'
import Profile from './View/Profile'
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'
import setAuthToken from './helper/set_authtoken'
import jwt_decode from 'jwt-decode'
import {SET_USER} from './actions/Type'
import PrivateRoute from './_Layout/PrivateRoute'

if(localStorage.jwttoken){
    const jwttoken = localStorage.jwttoken;  
    //set authtoken to header
    setAuthToken(jwttoken);
    //decode token
    const decode = jwt_decode(jwttoken)
    //set user and is authenticate
    store.dispatch({
      type:SET_USER,
      payload:decode
    })
}
export default class App extends Component {
  render() {
    return (
      <div>
            <Provider store={store}>
            <Router>
                <NavBarPage />
                <Switch>
                        <PrivateRoute exact path='/dashbord' component={Dashbord} />
                        <PrivateRoute exact path='/profile' component={Profile} />           
                </Switch>
                <Route exact path="/" component={LandingPage}></Route>
                <Route exact path="/Login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
            </Router>        
            </Provider>
      </div>
    )
  }
}
