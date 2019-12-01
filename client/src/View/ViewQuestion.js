import React, { Component } from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AnswersList from './answers'
import CommentList from './comment'
import isEmpty from '../helper/is_empty'
import {getQuestionsDetails,getQuestionAnswer,getQuestionComments,submitAnswer,submitComment} from '../actions/QuestionAction'
import {Container,Card,CardBody,CardHeader,CardFooter,Row,Col,Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'

class ViewQuestion extends Component {
    constructor(props){
        super(props)
        const value =  queryString.parse(this.props.location.search)
        this.state={
            id:value.id,
            userid:props.user.id,
            username:props.user.name,
            ans:null,
            comment:null
        }
    }
    componentDidMount(){
        if(this.state.id){
            this.props.getQuestionsDetails(this.state.id);
            this.props.getQuestionAnswer(this.state.id);
            this.props.getQuestionComments(this.state.id);
        }else{
           this.props.history.push('/topquestions')
        }
    }
    onSubmitHandlar = () =>{
        const userData = {
            answer:this.state.ans,
            qtnid:this.state.id,
            userid:this.state.userid
        }
        this.props.submitAnswer(userData)

    }
    onChangeHandler= e =>{
        this.setState({
            comment:e.target.value
        })
    }
    onCommentSubmit = () =>{
        const userData = {
            comment:this.state.comment,
            qtnid:this.state.id,
            userid:this.state.userid,
            username:this.state.username
        }
        this.props.submitComment(userData)
    }
    render() {
        const {qtndetails,answers,comments,error} = this.props
        const protErr ={
            Ans:null,
            com:null
        }
        if(error){
           error.map((Element)=>{
               if(Element.param === 'answer')
               protErr.Ans = Element.msg
               else if(Element.param === 'comment')
               protErr.com = Element.msg
           })
        }
        var ans =null
        if(!isEmpty(answers)){
                ans =(
                    <AnswersList  ans = {answers}/>
                )
        }
        var comment = null
        if(!isEmpty(comments)){
                comment = (
                    <CommentList comment = {comments} />
                )
        }
        const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                                <Card style={{marginTop:'10px'}}>
                                    <CardHeader tag='h2'> 
                                            {qtndetails.question}
                                    </CardHeader>
                                    <CardBody>
                                            <pre><code>{renderHTML(qtndetails.questionDesc)}</code></pre>
                                    </CardBody>
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                    {ans}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <Card style={{marginTop:'10px'}}>
                                    <CardHeader tag='h2'>
                                           Your Answer
                                    </CardHeader>
                                    <CardBody>
                                            <CKEditor 
                                                editor={ClassicEditor}
                                                onInit={ editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log( 'Editor is ready to use!', editor );
                                                } }
                                                onChange={ ( event, editor ) => {
                                                    const data = editor.getData()
                                                    this.setState({
                                                        ans:data
                                                    })
                                                } }
                                            />
                                            <p className='text-danger'>{protErr.Ans}</p>
                                            <Button outline color='primary' onClick={this.onSubmitHandlar} style={{marginTop:'10px',float:'right'}}>Submit</Button>
                                    </CardBody>
                                </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <Card style={{marginTop:'10px',marginBottom:'20px'}}>
                                    <CardBody>
                                            <InputGroup>
                                                <Input  name='comment' placeholder='Comments........' onChange={this.onChangeHandler}/>
                                                <InputGroupAddon addonType="prepend"><Button outline color='primary' onClick={this.onCommentSubmit} >Submit</Button></InputGroupAddon>
                                            </InputGroup>
                                            <p className='text-danger'>{protErr.com}</p>
                                    </CardBody>
                                                {comment}
                                </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    qtndetails:state.question.qtndetails,
    answers:state.question.answers,
    comments:state.question.comments,
    user:state.auth.user,
    error:state.question.errors.errors
})
export default connect(mapStateToProps,{getQuestionsDetails,getQuestionAnswer,getQuestionComments,submitAnswer,submitComment})(ViewQuestion)