import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge, Button, Modal, CardHeader, FormGroup, Input, Alert } from "reactstrap";

class Collaboration extends React.Component {
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
                                    <span className="text-uppercase mb-0 font-weight-bold">  Guitarist</span>
                                </Badge>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FLennerd%20Lim.jpg?alt=media&token=c6cebd37-3859-4c57-8a5e-7435fdddb671"
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Lennerd Lim
                                                    </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                Guitarist, Singer
                                                    </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-sm">
                                                <i className="ni ni-pin-3"></i> Singapore
                                                </span>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FLee%20Pei%20Lun.jpg?alt=media&token=ea760e8b-f388-49b9-b2e9-435c7f145e47"
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Lee Pei Lun
                                                        </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                Guitarist
                                                        </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-sm">
                                                <i className="ni ni-pin-3"></i> Singapore
                                                    </span>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FHuang%20Mei%20Ting.jpg?alt=media&token=a11f5b52-0c9c-42df-93c8-60f2bc9696b9"
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Mei Ting
                                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                Guitarist
                                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-sm">
                                                <i className="ni ni-pin-3"></i> Singapore
                                                        </span>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FDaryl%20Pang.jpg?alt=media&token=b2ad1e3e-b263-44a4-8179-09c77be878cb"
                                    top
                                />
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase mb-0 font-weight-bold"
                                            >
                                                Daryl Pang
                                                                </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                Guitarist
                                                                </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <span className="mt-3 mb-0 text-sm">
                                                <i className="ni ni-pin-3"></i> Singapore
                                                            </span>
                                        </div>
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
                                        <span className="text-uppercase mb-0 font-weight-bold">  Singer</span>
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FYokez%20Lim.jpg?alt=media&token=59eab31c-6027-4d5f-8004-5c7fc92af6b6"
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Yokez
                                                </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    Singer, Song Writer
                                                </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-pin-3"></i> Singapore
                                            </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FJames%20Liu.jpg?alt=media&token=2c930838-c7d6-47bd-9f49-93eb1b77f463"
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    James Liu
                                                    </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    Singer, Song Writer
                                                    </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-pin-3"></i> Singapore
                                                </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FRuth%20Kueo.jpg?alt=media&token=6135dc83-d0d5-4b7a-897a-3525c0b3438a"
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Ruth Keo
                                                        </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    Singer, Song Writer
                                                        </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-pin-3"></i> Singapore
                                                    </span>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardImg
                                    src="https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2FWong%20Shou%20Wei.jpg?alt=media&token=029f35c2-200c-4a76-bb18-30637e2a2052"
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    Wong Shou Wei
                                                            </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    Singer, Song Writer
                                                            </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                    <i className="ni ni-pin-3"></i> Singapore
                                                        </span>
                                            </div>
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
                                <div style={{ marginBottom: '15px' }}>
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
                                        src='https://img.stomp.com.sg/s3fs-public/styles/3x2/public/images/2017/03/nus.jpg?itok=jzU2rwCm'
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

export default Collaboration;