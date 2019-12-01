import React, { Component } from 'react'
import {CardBody,Media,Badge,Card} from 'reactstrap'
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faComment,faCalendar, faUser} from '@fortawesome/free-solid-svg-icons'
export default class comment extends Component {
    render() {
        const {comment} =this.props
        const com = comment.map((Element,index)=>(
            <React.Fragment>
            <Media key={index}>
                <Media left href="#">
                    <FontAwesomeIcon icon={faComment}/>
                </Media>
                <Media body>
                    <Media heading>{Element.comment}</Media>
                        <FontAwesomeIcon icon={faCalendar}/><Badge pill color='primary'>{Element.date}</Badge>
                        <FontAwesomeIcon icon={faUser}/><Badge pill color='primary'>{Element.username}</Badge>
                </Media>
          </Media>
          <hr/>
          </React.Fragment>
        ))
        return (
            <div>
                <Card>
                    <h2 className='text-center'>Comments</h2>
                    <hr/>
                   <CardBody>
                            {com}
                    </CardBody>  
                </Card>  
            </div>
        )
    }
}
