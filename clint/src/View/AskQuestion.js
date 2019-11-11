import React, { Component } from 'react'
import {Container,Card,CardBody,CardHeader,Row,Col,Input} from 'reactstrap'
export default class AskQuestion extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <h2>AskQuestion</h2>
                                </CardHeader>
                                <CardBody>
                                    <Input />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
