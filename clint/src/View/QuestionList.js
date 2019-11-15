import React, { Component } from 'react'
import {Card,CardBody,CardHeader,CardFooter,Badge} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faCalendarAlt} from '@fortawesome/free-solid-svg-icons'

export default class QuestionList extends Component {
    render() {
        const {qtn} = this.props;
        const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
        return (
            
                    <Card style={{marginTop:'10px'}}>
                        <CardHeader tag='h3'>
                                {qtn.question}
                        </CardHeader>
                        <CardBody>
                               <pre><code>{renderHTML(qtn.questionDesc)}</code></pre> 
                        </CardBody>
                        <CardFooter>
                        <FontAwesomeIcon tag='i' icon={faEye} /><Badge pill>{qtn.view}</Badge> <FontAwesomeIcon icon={faCalendarAlt} />{qtn.date}
                        </CardFooter>
                    </Card>
        )
    }
}
