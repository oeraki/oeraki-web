import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge, Button, Modal, CardHeader, FormGroup, Input, Alert, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import firebase from '../firebase';

class Events extends React.Component {
    constructor(props) {
        super(props)
        
        // START: Listeners for Event Detail Toggle
        this.toggleEventDetail = this.toggleEventDetail.bind(this)
        this.toggleApplyModal = this.toggleApplyModal.bind(this)
        this.toggleApplied = this.toggleApplied.bind(this)
        // END: isteners for Event Detail Toggle

        this.state = {
            // START: States for Event Detail Toggle
            showEventDetail: false,
            applyModal: false,
            applied: false,
            // END: States for Event Detail Toggle

            // START: States for Firestore
            databaseRef: firebase.firestore(),
            user: firebase.auth().currentUser,
            // END: States for Firestore

            // START: States for Events
            events: [],
            currentMusicEvent: null
            // END: States for Events
        }
    }

    // START: Methods for REACT Life Cycle
    componentDidMount() {
        let db = this.state.databaseRef
        let self = this

        // Listener on events
        this.unsub_events = db.collection("events").onSnapshot(function (querySnapshot) {
            var events = [];
            querySnapshot.forEach(function (doc) {
                let event = doc.data()
                event['id'] = doc.id
                events.push(event);
            });
            self.setState({
                events: events
            })
        });
    }

    componentWillUnmount() {
        this.unsub_events && this.unsub_events()
    }
    // END: Methods for REACT Life Cycle

    // START: Methods for Event Detail Toggle
    toggleEventDetail(music_event) {
        this.setState({
            showEventDetail: !this.state.showEventDetail,
            currentMusicEvent: music_event
        })
        console.log(this.state.events)
    }
    toggleApplyModal() {
        this.setState({
            applyModal: !this.state.applyModal,
            applied: false
        })
    }
    toggleApplied() {
        this.setState({
            applied: !this.state.applied
        })
    }
    // END: Methods for Event Detail Toggle

    render() {
        return (
            <>
                <Header />
                {!this.state.showEventDetail &&
                    <Container className=" mt--7" fluid>
                        <Row>
                            <div className="navbar-search navbar-search-dark form-inline mr-3 d-sm-flex d-md-flex ml-lg-auto">
                                <FormGroup className="mb-0">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Search" type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <Col lg="6" xl="3">
                                <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                                    <Badge className="badge-default">
                                        <i className="ni ni-notification-70"></i>
                                        <span className="text-uppercase mb-0 font-weight-bold">  Cafes & Schools</span>
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                        {/* START: List of events */}
                        <Row>
                            {this.state.events.length > 0 && this.state.events.map((music_event, index) => (
                                <Col lg="6" xl="3" key={index} style={{marginBottom: '15px'}}
                                    onClick={() => this.toggleEventDetail(music_event)}
                                >
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardImg
                                            src={music_event.url}
                                            top
                                        />
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase mb-0 font-weight-bold"
                                                    >
                                                        {music_event.title}
                                            </CardTitle>
                                                    <span className="mt-3 mb-0 text-muted text-sm">
                                                        by {music_event.owner}
                                            </span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="col">
                                                    <span className="mt-3 mb-0 text-sm">
                                                        <i className="ni ni-calendar-grid-58"></i> {music_event.time}
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
                            ))}
                        </Row>
                        {/* END: List of events */}

                    </Container>
                }
                {this.state.showEventDetail && this.state.currentMusicEvent &&
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
                                            <strong>By applying</strong>, your profile & music works will be seen by the event host
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
                                        onClick={() => this.toggleEventDetail(null)}
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
                                    src={this.state.currentMusicEvent.url}
                                        top
                                    />
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0 font-weight-bold"
                                                >
                                                    {this.state.currentMusicEvent.title}
                                                </CardTitle>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    by {this.state.currentMusicEvent.owner}
                                                </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <span className="mt-3 mb-0 text-sm">
                                                <i className="ni ni-calendar-grid-58"></i> {this.state.currentMusicEvent.time}
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
                                                    {this.state.currentMusicEvent.description}
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
                                                    {this.state.currentMusicEvent.pay}
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
                                                    {this.state.currentMusicEvent.location}
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