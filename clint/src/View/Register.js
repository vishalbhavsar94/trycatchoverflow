import React, { Component } from 'react'
import {Card,CardBody,CardHeader,CardTitle,Row,Col,Container,Form,FormGroup,Label,Input,Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserType,postRegister} from '../actions/Auth'

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            passwordConf:'',
            type:'',
            types:[],
            errors:[]
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors.param === "err"){
            this.setState({
                errors:[nextProps.errors]
            })
        }else{
            this.setState({
                errors:nextProps.errors.errors
            });
        }   
           console.log(nextProps.errors.errors);
           
    }
    componentDidMount(){
        this.props.getUserType()
    }
    onChange= e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit= e => {
        e.preventDefault()
        const userData = {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password,
            passwordConf:this.state.passwordConf,
            type:this.state.type
        }
        this.props.postRegister(userData,this.props.history)
    }

    render() {
        const errors = this.state.errors;
        var protErr = {
            fnameErr:'',
            lnameErr:'',
            emailErr:'',
            passwordErr:'',
            passwordConfErr:'',
            typeErr:'',
            err:''
        }
        if(errors){
            errors.forEach((element) => {
                   if(element.param === "firstname")
                   protErr.fnameErr=element.msg
                   if(element.param === "lastname")
                   protErr.lnameErr=element.msg
                   else if(element.param === "email")
                   protErr.emailErr=element.msg
                   else if(element.param === "password")
                   protErr.passwordErr=element.msg
                   else if(element.param === "passwordConf")
                   protErr.passwordConfErr=element.msg
                   if(element.param === "type")
                   protErr.TypeErr=element.msg
                   else if(element.param === "err")
                   protErr.err=element.msg
                   
            });
            
        }      
         const {types} = this.props
         const option =  types.map(element => (
            <option key={element._id} value={element._id}>{element.type}</option>
        ))
        return (
           <Container>
               <Row className='justify-content-center'>
                   <Col md='6'>
                            <Card>
                                <CardHeader>
                                    <Link to='/login' className='float-right btn btn-outline-primary'>login</Link>
                                    <CardTitle>Register</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.onSubmit}>
                                    <p className='text-center text-danger'>{protErr.err}</p>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                            <Label for='firstname'>FirstName</Label>
                                                            <Input name='firstname' id='firstname' onChange={this.onChange} value={this.state.firstname}/>
                                                             <span className='text-danger'>{protErr.fnameErr}</span>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                            <Label for='lastname'>LastName</Label>
                                                            <Input name='lastname' id='lastname'  onChange={this.onChange} value={this.state.lastname}/>
                                                            <span className='text-danger'>{protErr.lnameErr}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                                <FormGroup>
                                                    <Label for='email'>Email</Label>
                                                    <Input name='email' id='email'  onChange={this.onChange} value={this.state.email}/>
                                                    <span className='text-danger'>{protErr.emailErr}</span>
                                                </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                            <Label for='password'>Password</Label>
                                                            <Input name='password' id='password'  onChange={this.onChange} value={this.state.password}/>
                                                            <span className='text-danger'>{protErr.passwordErr}</span>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                            <Label for='passwordConf'>Password Confermation</Label>
                                                            <Input name='passwordConf' id='passwordConf'  onChange={this.onChange} value={this.state.passwordCnf}/>
                                                            <span className='text-danger'>{protErr.passwordConfErr}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup>
                                                    <Label>UserType</Label>
                                                    <Input type='select' name='type'  onChange={this.onChange}>
                                                        {option}     
                                                    </Input>
                                                    <span className='text-danger'>{protErr.typeErr}</span>
                                            </FormGroup>
                                        <Button className='btn btn-primary'>Submit</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                   </Col>
               </Row>
           </Container>
        )
    }
}
const mapStateToProps = state =>({
    errors:state.auth.errors,
    types:state.auth.types
}) 
export default connect(mapStateToProps,{getUserType,postRegister})(Register)