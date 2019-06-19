import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge, Button, Modal, CardHeader, FormGroup, Input, Alert } from "reactstrap";
import firebase from '../firebase';

class Collaboration extends React.Component {
    constructor(props) {
        super(props)

        // START: Listeners for Event Detail Toggle
        this.toggleMusicianDetail = this.toggleMusicianDetail.bind(this)
        this.toggleApplyModal = this.toggleApplyModal.bind(this)
        this.toggleApplied = this.toggleApplied.bind(this)
        // END: isteners for Event Detail Toggle

        this.state = {
            // START: States for Event Detail Toggle
            showMusicianDetail: false,
            applyModal: false,
            applied: false,
            // END: States for Event Detail Toggle

            // START: States for Firestore
            databaseRef: firebase.firestore(),
            user: firebase.auth().currentUser,
            // END: States for Firestore

            // START: States for Events
            musicians: [],
            currentMusician: null
            // END: States for Events
        }
    }

    // START: Methods for REACT Life Cycle
    componentDidMount() {
        let db = this.state.databaseRef
        let self = this

        // Listener on events
        db.collection("demo_users").onSnapshot(function (querySnapshot) {
            var musicians = [];
            querySnapshot.forEach(function (doc) {
                let musician = doc.data()
                musicians['id'] = doc.id
                musicians.push(musician);
            });
            self.setState({
                musicians: musicians
            })
        });
    }
    // END: Methods for REACT Life Cycle

    // START: Methods for Event Detail Toggle
    toggleMusicianDetail(musician) {
        this.setState({
            showMusicianDetail: !this.state.showMusicianDetail,
            currentMusician: musician
        })
        console.log(this.state.events)
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
                {!this.state.showMusicianDetail &&
                    <Container className=" mt--7" fluid>
                        <Row>
                            <Col lg="6" xl="3">
                                <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                                    <Badge className="badge-default">
                                        <i className="ni ni-notification-70"></i>
                                        <span className="text-uppercase mb-0 font-weight-bold">  Trending Artists</span>
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                        {/* START: List of events */}
                        <Row>
                            {this.state.musicians.length > 0 && this.state.musicians.map((musician, index) => (
                                <Col lg="6" xl="3" key={index} style={{ marginBottom: '15px' }}
                                    // onClick={() => this.toggleEventDetail(music_event)}
                                >
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardImg
                                            src={musician.avatar}
                                            top
                                        />
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase mb-0 font-weight-bold"
                                                    >
                                                        {musician.username}
                                                    </CardTitle>
                                                    <span className="mt-3 mb-0 text-muted text-sm">
                                                        {musician.skills[0]}
                                                    </span>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="col">
                                                    <span className="mt-3 mb-0 text-sm">
                                                        <i className="ni ni-pin-3"></i> {musician.address}
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

            </>
        );
    }
}

export default Collaboration;