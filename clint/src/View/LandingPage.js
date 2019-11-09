import React, { Component } from 'react'
import { Jumbotron, Container,Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
            <Jumbotron fluid>
                <Container fluid>
                <h1 className="display-3">Fluid jumbotron</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </Container>
            </Jumbotron>
            
            <Row>
                <Col lg='6' >
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}> 
                    <FontAwesomeIcon icon={faQuestionCircle} style={{width:'100%',height:'100%'}}/>
                    <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                    </CardBody>
                    </Card>
                </Col>
                <Col lg='6'>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <FontAwesomeIcon icon={faQuestionCircle}  style={{width:'100%',height:'100%'}}/>
                    <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
            </div>          
        )
    }
}
