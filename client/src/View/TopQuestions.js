import React, { Component } from 'react'
import {Card,CardBody,CardHeader,CardFooter,Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap'
import {connect} from 'react-redux'
import {getTopQuestions} from '../actions/QuestionAction'

class TopQuestions extends Component {
    componentDidMount(){
        this.props.getTopQuestions()
    }
    onclickHandle = e => {
      this.props.history.push(`/viewquestions?id=${e.target.id}`)
    }
    render() {
        const {questions} = this.props
        return (
            <div>
                <Container>
                        <Row>
                            <Col>
                                <h2>TopQuestions</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Card>
                                <CardHeader>
                                    TopQuestions
                                </CardHeader>
                                <CardBody>
                                        <ListGroup>
                                           {
                                                questions.map((Element,index) =>                                                 
                                                        <ListGroupItem key={index} tag='button' action id={Element._id} onClick={this.onclickHandle}>{Element.question}</ListGroupItem>
                                                )
                                           }
                                        </ListGroup>
                                </CardBody>
                                <CardFooter>

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
    questions:state.question.topquestions
})
export default connect(mapStateToProps,{getTopQuestions})(TopQuestions)