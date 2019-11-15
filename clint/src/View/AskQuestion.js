import React, { Component } from 'react'
import {Container,Card,CardBody,CardHeader,Row,Col,Input,FormGroup,Label,Button} from 'reactstrap'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {SubmitQuestion} from '../actions/QuestionAction'
import {connect} from 'react-redux'

class AskQuestion extends Component {
    constructor(props){
        super(props)
        this.state={
            Question:null,
            Editor:null,
            id:props.user.id,
            errors:[]
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        } 
    }
    onSubmitHandle = e =>{
        e.preventDefault();
        const userData = {
            Question:this.state.Question,
            Editor:this.state.Editor,
            id:this.state.id
        }
        console.log(userData);
    this.props.SubmitQuestion(userData,this.props.history);
    }
    onChangeHandler = e =>{
        this.setState({
            Question:e.target.value
        })
    }
    render() {
    const errors = this.state.errors
    var questionErr = null
    if(errors){
        errors.forEach(element => {
            questionErr = element.msg
        });
    }
    console.log(errors);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card style={{marginTop:'10px'}}>
                                <CardHeader>
                                    <h2>AskQuestion</h2>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label htmlFor='Question'>Question <span className='text-danger'>*</span></Label>
                                        <Input name='Question' id='Question' onChange={this.onChangeHandler}/>
                                            <p className='text-danger'>{questionErr}</p>
                                    </FormGroup>
                                    <Label >Question Description</Label>
                                    <CKEditor 
                                        editor={ClassicEditor}
                                        onInit={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            this.setState({
                                                Editor:data
                                            })
                                        } }
                                     />
                                     <Button outline color='primary' style={{float:'right',marginTop:'10px'}} onClick={this.onSubmitHandle}>Submit</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    errors:state.question.errors,
    user:state.auth.user
})
export default connect(mapStateToProps,{SubmitQuestion})(AskQuestion)