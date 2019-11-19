import React, { Component } from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {getQuestionsDetails,getQuestionAnswer,getQuestionComments,submitAnswer} from '../actions/QuestionAction'
import {Container,Card,CardBody,CardHeader,CardFooter,Row,Col,Button} from 'reactstrap'

class ViewQuestion extends Component {
    constructor(props){
        super(props)
        const value =  queryString.parse(this.props.location.search)
        this.state={
            id:value.id,
            userid:props.user.id,
            ans:null
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
    render() {
        const {qtndetails,answers,comments} = this.props
        
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
                                     <Button outline color='primary' onClick={this.onSubmitHandlar} style={{marginTop:'10px',float:'right'}}>Submit</Button>
                                    </CardFooter>
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
    user:state.auth.user
})
export default connect(mapStateToProps,{getQuestionsDetails,getQuestionAnswer,getQuestionComments,submitAnswer})(ViewQuestion)