import React, { Component } from 'react'
import {Container,Row,Col,Input,UncontrolledCollapse,Card,CardBody,Button,
        ListGroup,ListGroupItem,InputGroup,InputGroupAddon,Form} from "reactstrap";
import {connect} from 'react-redux'
import {updateProfile,uploadImage} from '../actions/ProfileAction'

 class Profile extends Component {
     constructor(props){
         super(props)
         this.state ={
             id:props.user.id,
             firstname:'',
             lastname:'',
             email:'',
             slectedFile:null,
             loaded:false,
             error:[]
         }
     }
     componentWillReceiveProps(nextProps){
            if(nextProps.error){
                this.setState({
                    error:nextProps.error.errors
                })
            }
     }
     onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })   
     }
     onImageUpload =e => {
        this.setState({
            slectedFile:e.target.files[0],
            loaded:true
        })
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
         
     }
     onSubmitImage = e =>{
         e.preventDefault()
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        this.props.uploadImage(data);
     }
     OnUserUpdate = e =>{
         if(e.target.name === 'firstname'){
            const  userData = {
                id:this.state.id,
                type:'firstname',
                firstname:this.state.firstname
            } 
            this.props.updateProfile(userData,this.props.history)

         }else if(e.target.name === 'lastname'){
            const  userData = {
                id:this.state.id,
                type:'lastname',
                lastname:this.state.lastname
            } 
            this.props.updateProfile(userData,this.props.history)
           
         }else if(e.target.name === 'email')
         {
            const  userData = {
                id:this.state.id,
                type:'email',
                email:this.state.email
            } 
            this.props.updateProfile(userData,this.props.history)
         }
         
     }
    render() {
        const {name,lname,email,id} = this.props.user
        const error = this.state.error;
        const protErr={
            firstnameErr:'',
            lastnameErr:'',
            emailErr:'',
        }
        if(error){
            error.forEach(element => {
                if(element.param === 'firstname')
                protErr.firstnameErr = element.msg
                else if(element.param === 'lastname')
                protErr.lastnameErr = element.msg
                else if(element.param === 'email')
                protErr.emailErr = element.msg
            });
        }
        return (
            <div>
                <Container>
                    <Form encType='multipart/form-data' onSubmit={this.onSubmitImage}> 
                    <Row className='d-flex justify-content-center'>  
                        
                        <div>
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar rounded-circle img-thumbnail" alt="avatar"/>
                                    <h6></h6>
                                    <div className="custom-file" style={{marginLeft:'-30px'}}>
                                        <Input type="file" className="custom-file-input" id="customFile" onChange={this.onImageUpload}/>
                                              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    <br/>
                        </div>
                    </Row>
                            {this.state.loaded ?
                            <Row>
                                    <Col className='text-center'>
                                        <Button outline color='primary' style={{marginTop:'10px',marginRight:'55px'}} type='submit'>Upload</Button>    
                                    </Col>
                             </Row>
                             :null}
                    
                    <hr/>
                    </Form>
                    <Row>
                   
                        <Col sm='3' >

                                <ListGroup>
                                    <ListGroupItem active >Activity</ListGroupItem>
                                    <ListGroupItem><strong>Shares</strong>125</ListGroupItem>
                                    <ListGroupItem><strong>Shares</strong>125</ListGroupItem>
                                    <ListGroupItem><strong>Shares</strong>125</ListGroupItem>
                                    <ListGroupItem><strong>Shares</strong>125</ListGroupItem>
                                    <ListGroupItem><strong>Shares</strong>125</ListGroupItem>
                                </ListGroup>    
                        </Col>
                        <Col sm='9'>                       
                                <ListGroupItem active tag="button" action id="fname">name:{name} </ListGroupItem>
                                <UncontrolledCollapse toggler="#fname">
                                    <Card>
                                    <CardBody>
                                    <InputGroup>
                                        <Input placeholder={name} onChange={this.onChange} name='firstname' id='firstname' />
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary" onClick={this.OnUserUpdate} name='firstname'>Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
                                    <p className='text-danger'>{protErr.firstnameErr}</p>
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                                <hr/>
                                <ListGroupItem active tag="button" action id="lname" >LastName:{lname} </ListGroupItem>
                                <UncontrolledCollapse toggler="#lname">
                                    <Card>
                                    <CardBody>
                                    <InputGroup>
                                        <Input placeholder={lname}  name ='lastname' onChange={this.onChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary" onClick={this.OnUserUpdate} name='lastname'>Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
                                    <p className='text-danger'>{protErr.lastnameErr}</p>
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                                <hr/>
                                <ListGroupItem active tag="button" action id="email">Email:{email} </ListGroupItem>
                                <UncontrolledCollapse toggler="#email">
                                    <Card>
                                    <CardBody>
                                    <InputGroup>
                                        <Input placeholder={email} onChange={this.onChange} name='email' />
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary" onClick={this.OnUserUpdate} name='email'>Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
                                    <p className='text-danger'>{protErr.emailErr}</p>
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user:state.auth.user,
    error:state.profile.errors
})
export default connect(mapStateToProps,{updateProfile,uploadImage})(Profile)