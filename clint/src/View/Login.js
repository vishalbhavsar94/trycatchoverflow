import React, { Component } from 'react'
import {Button,Input,InputGroup,InputGroupAddon,FormGroup,Form,Card,CardBody,CardHeader,Col,Row} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faUnlock} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {loginUser} from '../actions/Auth'

class Login extends Component {

        constructor(props){
            super(props)
            this.state={
                email:'',
                password:'',
                errors:[]
            }
        }
    componentWillReceiveProps(nextProps){
        if (nextProps.isAuthenticated) {
                this.props.history.push('/dashbord');
            } 
        if(nextProps.errors){
            if(nextProps.errors.param === "err"){
                this.setState({
                    errors:[nextProps.errors]
                })
            }else{
                this.setState({
                    errors:nextProps.errors.errors
                });
            }
        }
    }
    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push('/dashbord');
        }
    }
    onChange= e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit= e => {
        e.preventDefault()
        const userData ={
            email:this.state.email,
            password:this.state.password
        } 
        this.props.loginUser(userData,this.props.history)
    }
    render() {
        const {errors} = this.state
        var protErr = {
            emailErr:'',
            passwordErr:'',
            Err:''
        }
        if(errors){
            errors.forEach(element => {
                if(element.param === "email")
                protErr.emailErr=element.msg
                else if(element.param === "password")
                protErr.passwordErr=element.msg
                else if(element.param === "err")
                protErr.Err=element.msg
            });
        }
        return (
            <div>
                <Row  className='justify-content-center'>
                    <Col md='6'>
                    <Form onSubmit={this.onSubmit}>
                        <Card>  
                            <CardHeader>Login</CardHeader>
                                <CardBody>
                                <p className='text-center text-danger'>{protErr.Err}</p>
                                    <FormGroup>
                                    <span>Email</span>
                                    <InputGroup>                    
                                        <InputGroupAddon addonType='append'><FontAwesomeIcon icon={faUser} size='lg'/></InputGroupAddon>
                                            <Input placeholder='Email' name='email' placeholder='email' onChange={this.onChange}></Input>
                                        </InputGroup>
                                    <p className='text-danger'>{protErr.emailErr}</p>
                                    </FormGroup>
                                    <FormGroup>
                                    <span>Password</span>
                                    <InputGroup>
                                            <InputGroupAddon addonType='append'><FontAwesomeIcon icon={faUnlock} size='lg'/></InputGroupAddon>
                                            <Input placeholder='password' name='password' placeholder='password' onChange={this.onChange}></Input>
                                        </InputGroup>
                                        <p className='text-danger'>{protErr.passwordErr}</p>
                                    </FormGroup>
                                    <Button className='btn btn-primary'>Login</Button>
                                </CardBody>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    errors:state.auth.errors,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{loginUser})(Login)