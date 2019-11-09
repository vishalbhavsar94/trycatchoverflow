import React, { Component } from 'react'
import {Container,Row,Col,Input,UncontrolledCollapse,Card,CardBody,Button,
        ListGroup,ListGroupItem,InputGroup,InputGroupAddon} from "reactstrap";
import {connect} from 'react-redux'

 class Profile extends Component {
     constructor(props){
         super(props)
         this.state ={
             firstname:'',
             lastname:'',
             email:'',
         }
     }
     onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        }) 
        console.log(this.state.firstname);
        
     }
    render() {
        const {name,lname,email} = this.props.user
        return (
            <div>
                <Container>
                    <Row className='d-flex justify-content-center'>  
                        <div>
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar rounded-circle img-thumbnail" alt="avatar"/>
                                    <h6></h6>
                                    <div className="custom-file" style={{marginLeft:'-30px'}}>
                                        <Input type="file" className="custom-file-input" id="customFile"/>
                                              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    <br/>
                        </div>
                    </Row>
                    <hr/>
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
                                        <Input placeholder={name} onChange={this.onChange} name='firstname' />
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary">Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                                <hr/>
                                <ListGroupItem active tag="button" action id="lname" name ='lastname' >LastName:{lname} </ListGroupItem>
                                <UncontrolledCollapse toggler="#lname">
                                    <Card>
                                    <CardBody>
                                    <InputGroup>
                                        <Input placeholder={lname} onChange={this.onChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary">Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
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
                                                <Button color="primary">Edit</Button>
                                            </InputGroupAddon>
                                    </InputGroup>
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
    user:state.auth.user
})
export default connect(mapStateToProps)(Profile)