import React, { Component } from 'react'
import {Card,CardBody,CardHeader,CardFooter,Row,Col} from 'reactstrap'

export default class answers extends Component {
    constructor(props){
        super(props)
        this.state ={

        }
    }
    render() {
        const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
        const {ans} = this.props
        const answerlist =  ans.map((answers,index)=>(
                <Row key={index}>
                <Col>
                    <Card style={{marginTop:'10px'}}>
                        <CardBody>
                                <pre><code>{renderHTML(answers.answer)}</code></pre>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        ))
        return (
            <div>
                {answerlist}
            </div>
        )
    }
}
