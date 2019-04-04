import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge } from "reactstrap";

class Feed extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <Col lg="6" xl="3">
                            <div style={{ marginBottom: '15px', marginTop: '15px'}}> 
                                <Badge className="badge-default">
                                    <i className="ni ni-notification-70"></i>
                                    <span className="text-uppercase mb-0 font-weight-bold">  Trending</span>
                                </Badge>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg 
                                    src='https://upload.wikimedia.org/wikipedia/commons/3/37/Childish_Gambino.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://images.unsplash.com/photo-1547747031-a3605ce15ff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Traffic_1973.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://thewhitetree.com.au/app/uploads/2018/01/2M9A0536-2.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="6" xl="3">
                            <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                                <Badge className="badge-default">
                                    <i className="ni ni-notification-70"></i>
                                    <span className="text-uppercase mb-0 font-weight-bold">  Trending</span>
                                </Badge>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://upload.wikimedia.org/wikipedia/commons/3/37/Childish_Gambino.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://images.unsplash.com/photo-1547747031-a3605ce15ff9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Traffic_1973.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src='https://thewhitetree.com.au/app/uploads/2018/01/2M9A0536-2.jpg'
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Never been this way
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                140k views
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    
                </Container>
            </>
        );
    }
}

export default Feed;
