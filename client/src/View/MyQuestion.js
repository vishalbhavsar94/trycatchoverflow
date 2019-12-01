import React, { Component } from 'react'
import {Container} from 'reactstrap'
import {connect} from 'react-redux'
import {GetMyQuestion} from '../actions/QuestionAction'
import QuestionList from './QuestionList'


class MyQuestion extends Component {
    constructor(props){
        super(props)
        this.state={
            questions:[],
            id:props.user.id         
        }
    }
    componentDidMount(){
        this.props.GetMyQuestion(this.state.id)
    }
    render() {
   const {questions} = this.props
        return (
            <div>
                    <h2 className='text-center'>MyQuestion</h2>
                    <hr/>
                <Container>
                         {
                         questions.map((element,index) => (
                            <QuestionList key={index} qtn={element} />
                         ))
                         }
                          
                </Container>
            </div>
        )
    }
}
const mapSatateToProps = state =>({
    questions:state.question.questions,
    user:state.auth.user
})
export default connect(mapSatateToProps,{GetMyQuestion})(MyQuestion)