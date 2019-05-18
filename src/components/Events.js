import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge, Button, Modal, CardHeader, FormGroup, Input, Alert } from "reactstrap";

class Events extends React.Component {
    constructor(props) {
        super(props)
        
        this.toggleEventDetail = this.toggleEventDetail.bind(this)
        this.toggleApplyModal = this.toggleApplyModal.bind(this)
        this.toggleApplied = this.toggleApplied.bind(this)

        this.state = {
            showEventDetail: false,
            applyModal: false,
            applied: false
        }
    }

    toggleEventDetail() {
        this.setState({
            showEventDetail: !this.state.showEventDetail
        })
    }

    toggleApplyModal() {
        this.setState({
            applyModal: !this.state.applyModal
        })
    }

    toggleApplied() {
        this.setState({
            applied: !this.state.applied
        })
    }

    render() {
        return (
            <>
                <Header />
                {!this.state.showEventDetail &&
                    <Container className=" mt--7" fluid>
                        <Row>
                            <Col lg="6" xl="3">
                                <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                                    <Badge className="badge-default">
                                        <i className="ni ni-notification-70"></i>
                                        <span className="text-uppercase mb-0 font-weight-bold">  Cafes</span>
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://media.cntraveler.com/photos/5a9051d0b00933493b9a68e1/master/w_820,c_limit/Park-Bench-Deli_2018_f5c64660862181.5a5c2815786e3.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Singer needed this Friday!!
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by Glasshouse Cafe
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Fri, 27 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://sethlui.com/wp-content/uploads/2015/03/symmetry-cafe-2403.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Music Band needed for night performance
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by Symmetry Cafe
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Wed, 25 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://sethlui.com/wp-content/uploads/2015/03/Nassim-Hill-bakery-1522.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    We need a guitarist
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by Nassim Hill Bakery
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Thurs, 26 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://media.cntraveler.com/photos/5a905b0b8087c02669a7db21/master/w_820,c_limit/Plain-Vanilla_2018_PV-TBstore-1.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Pianonist needed during the weekend
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by Plain Vanilla Bakery
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Sun, 29 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
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
                                        <span className="text-uppercase mb-0 font-weight-bold">  School events</span>
                                    </Badge>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0"
                                    onClick={this.toggleEventDetail}
                                >
                                    <CardImg
                                    src='https://d1m37zmi87nupc.cloudfront.net/wp-content/uploads/2018/03/07100957/nus_open_day_2018_social.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Singer for NUS Orientation
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by NUS
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Monday, 24 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://www.eggcreatives.com/wp-content/uploads/2016/06/hangar2.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Singer needed for NOC event
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by The Hangar
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Wed, 25 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                        src='https://www.redsports.sg/wp-content/uploads/2018/05/DSC00714.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Guitarist for sport festivals
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by Raffles JC
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Thurs, 26 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src='http://www.ntu.edu.sg/DiscoverURECA/PublishingImages/2014b.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Music performance needed
                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by NTU Career Fair
                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Sun, 29 May 2019
                                            </span>
                                            </div>
                                            {/* <Col className="col-auto">
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                3:30
                                            </span>
                                        </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                }
                {this.state.showEventDetail &&
                    <Container className=" mt--7" fluid>
                    {this.state.applyModal &&
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.applyModal}
                            toggle={this.toggleApplyModal}
                            size="lg"
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent">
                                        <span>Apply for this event</span>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={this.toggleApplyModal}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </CardHeader>
                                    {!this.state.applied &&
                                    <CardBody>
                                        <Alert color="primary">
                                            <strong>By applying</strong>, your profile & music works will be sent to the event host
                                        </Alert>
                                        <FormGroup>
                                            <label className="form-control-label">Message</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Send a message to the event host..."
                                                rows="4"
                                                type="textarea"
                                            />
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="button"
                                                onClick={this.toggleApplied}
                                            >
                                                Apply
                                        </Button>
                                        </div>
                                    </CardBody>
                                    }
                                    
                                    {this.state.applied &&
                                    <CardBody>
                                        <div className="py-3 text-center">
                                            <i className="ni ni-satisfied ni-3x" />
                                            <h4 className="heading mt-4">Hooray!</h4>
                                            <p>
                                                You have applied to perform in this event.
                                                <br></br>
                                                Please wait for the event host to contact you
                                            </p>
                                        </div>
                                    </CardBody>
                                    }
                                </Card>

                            </div>
                        </Modal>
                    }
                        <Row>
                            <Col lg="6" xl="3">
                                <div style={{ marginBottom: '15px'}}>
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={this.toggleEventDetail}
                                    >
                                    <i className="ni ni-bold-left"></i> Back
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" xl="12">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src='https://d1m37zmi87nupc.cloudfront.net/wp-content/uploads/2018/03/07100957/nus_open_day_2018_social.jpg'
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Singer for NUS Orientation
                                                </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by NUS
                                                </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-calendar-grid-58"></i> Monday, 24 May 2019
                                                </span>
                                            </div>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Description
                                                    </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    We need a talented singer to perform 5 songs during the event of NUS Orientation. The orientation lasts from 10AM to 5PM. There will be breaks of 20 mins between songs. Snacks are provided.
                                                </span>
                                            </div>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Pay
                                                </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    30 SGD per song
                                                </span>
                                            </div>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Location
                                                    </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    NUS Utown, Kent Ridge
                                                </span>
                                            </div>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <div className="col">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="button"
                                                    onClick={this.toggleApplyModal}
                                                >
                                                    <i className="ni ni-user-run"></i> Apply
                                                </Button>
                                            </div>
                                        </Row>
                                        

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>                    
                }
                
            </>
        );
    }
}

export default Events;