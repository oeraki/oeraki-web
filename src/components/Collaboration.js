import React from "react";
import Header from './Header';
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg, Badge, Button, Modal, CardHeader, CardText } from "reactstrap";
import firebase from '../firebase';

class Collaboration extends React.Component {
    constructor(props) {
        super(props)

        // START: Listeners for Event Detail Toggle
        this.toggleMusicianDetail = this.toggleMusicianDetail.bind(this)
        this.toggleApplyModal = this.toggleApplyModal.bind(this)
        this.toggleApplied = this.toggleApplied.bind(this)
        // END: isteners for Event Detail Toggle

        this.setCurrentVideo = this.setCurrentVideo.bind(this)
        this.toggleVideoModal = this.toggleVideoModal.bind(this)

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
            currentMusician: null,
            // END: States for Events

            // START: States for uploaded video list
            uploaded_videos: [],
            current_video: null,
            videoModal: false,
            thumbnailURL: '',
            videoURL: '',
            // END: States for uploaded video list
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
                musician['id'] = doc.id
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
        let db = this.state.databaseRef
        let self = this

        if (musician) {
            db.collection("demo_users").doc(musician.id).collection("videos").get().then(function (querySnapshot) {
                let uploaded_videos = []
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    uploaded_videos.push(doc.data())
                });
                self.setState({
                    showMusicianDetail: !self.state.showMusicianDetail,
                    currentMusician: musician,
                    uploaded_videos: uploaded_videos
                })
                console.log(self.state.events)
                console.log(self.state.uploaded_videos)

            });
        } else {
            self.setState({
                showMusicianDetail: !self.state.showMusicianDetail,
                currentMusician: musician,
                uploaded_videos: []
            })
            console.log(self.state.events)
            console.log(self.state.uploaded_videos)
        }
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
    // END: Methods for Event Detail Toggle

    setCurrentVideo(video) {
        console.log('Current video:')
        console.log(video)
        this.setState({
            current_video: video,
            videoModal: !this.state.videoModal,
        })
    }
    toggleVideoModal(video) {
        this.setState({
            videoModal: !this.state.videoModal,
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
                                    onClick={() => this.toggleMusicianDetail(musician)}
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

                {this.state.showMusicianDetail && this.state.currentMusician &&
                    <Container className="mt--7" fluid>
                        {/* START: Modal for Opening Video */}
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.videoModal}
                            toggle={this.toggleVideoModal}
                            size="lg"
                        >
                            <div className="modal-body p-0">
                                {this.state.current_video &&
                                    <Card className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-transparent">
                                            <span>{this.state.current_video.title}</span>
                                            <br></br>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by {this.state.currentMusician.username}
                                            </span>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={this.toggleVideoModal}
                                            >
                                                <span aria-hidden={true}>×</span>
                                            </button>
                                        </CardHeader>
                                        <CardBody>
                                            <CardText>
                                                <span className="mt-3 mb-0 text-muted text-sm">
                                                    {this.state.current_video.description}
                                                </span>
                                            </CardText>
                                            {/* <video width="100%" controls>
                                                <source src={this.state.current_video.videoSource} type="video/mp4">
                                                </source>
                                            </video> */}
                                            <iframe width="100%" height="315" 
                                                src={this.state.current_video.videoSource} 
                                                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            >
                                            </iframe>
                                        </CardBody>
                                    </Card>
                                }
                                {!this.state.current_video &&
                                    <Card className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-transparent">
                                            <span>No video selected</span>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={this.toggleVideoModal}
                                            >
                                                <span aria-hidden={true}>×</span>
                                            </button>
                                        </CardHeader>
                                        <CardBody>
                                        </CardBody>
                                    </Card>
                                }
                            </div>
                        </Modal>
                        {/* END: Modal for Opening Video */}
                        <Row>
                            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                                <Card className="card-profile shadow">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="Changing Avatar..."
                                                        className="rounded-circle"
                                                        src={this.state.currentMusician.avatar}
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                        <div className="d-flex justify-content-between">
                                            <Button
                                                className="mr-4"
                                                color="info"
                                                href="#pablo"
                                                // onClick={this.toggleUploadModal}
                                                size="sm"
                                            >
                                                Let's connect
                                            </Button>
                                            <Button
                                                className="float-right"
                                                color="default"
                                                href="#pablo"
                                                // onClick={this.toggleEditModal}
                                                size="sm"
                                            >
                                                Give review
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-0 pt-md-4">
                                        <Row>
                                            <div className="col">
                                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                    <div>
                                                        {/* <span className="heading">{this.state.uploaded_videos.length}</span> */}
                                                        <span className="heading">0</span>
                                                        <span className="description">Songs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                        <div className="text-center">
                                            <h3>
                                                {this.state.currentMusician.username}
                                                {/* <span className="font-weight-light">, 27</span> */}
                                            </h3>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2" />
                                                {this.state.currentMusician.address}
                                            </div>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2" />
                                                {this.state.currentMusician.skills.length > 0 && this.state.currentMusician.skills.map((skill, index) => (
                                                    <span key={index}><Badge color="primary">{skill}</Badge> </span>
                                                ))}
                                            </div>
                                            <hr className="my-4" />
                                            <p>
                                                {this.state.currentMusician.description}
                                            </p>
                                            <a href="#pablo" 
                                                // onClick={this.seeReview}
                                            >
                                                See reviews
                                        </a>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="order-xl-1" xl="8">
                                <div style={{ marginBottom: '15px' }}>
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => this.toggleMusicianDetail(null)}
                                    >
                                        <i className="ni ni-bold-left"></i> Back
                                        </Button>
                                </div>
                                {this.state.uploaded_videos.length > 0 && this.state.uploaded_videos.map((video, index) => (
                                    <Card
                                        className="bg-secondary shadow"
                                        style={{ marginBottom: '10px' }}
                                        key={index}
                                    >
                                        <CardHeader>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <span className="avatar avatar-sm rounded-circle">
                                                    <img
                                                        alt="..."
                                                        src={this.state.currentMusician.avatar}
                                                    />
                                                </span>
                                                <span style={{ marginLeft: '10px' }}>
                                                    <span className="mb-0 text-sm font-weight-bold"> {video.ownerName}</span>
                                                    <span className="mb-0 text-sm"> uploaded on </span>
                                                    <span className="mb-0 text-sm text-muted">
                                                        {new Date(video.timestamp).getUTCDate()}/
                                                        {new Date(video.timestamp).getUTCMonth() + 1}/
                                                        {new Date(video.timestamp).getUTCFullYear()}
                                                    </span>
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs='6'>
                                                    <CardImg
                                                        src={video.thumbnail}
                                                        onClick={() => this.setCurrentVideo(video)}
                                                    >
                                                    </CardImg>
                                                </Col>
                                                <Col xs='auto'>
                                                    <CardTitle className="font-weight-bold mb-0">
                                                        {video.title}
                                                    </CardTitle>
                                                    <span className="mt-3 mb-0 text-muted text-sm">
                                                        by {video.ownerName}<br></br>
                                                        {video.views} views<br></br>
                                                        {/* <Button color="secondary" size="sm"
                                                            type="button"
                                                            onClick={() => this.removeVideo(video)}
                                                        >
                                                            <i className="fas fa-trash-alt"></i> Remove
                                                        </Button> */}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                ))}
                                {/* {this.state.uploaded_videos.length === 0 &&
                                    <Card
                                        className="bg-secondary shadow"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <CardBody>
                                            <div className="py-3 text-center">
                                                <i className="ni ni-image ni-3x" />
                                                <h4 className="heading mt-4">Nothing to see here...</h4>
                                                <p>
                                                    It seems you have not uploaded any music videos
                                                    <br></br>
                                                    Click 'Upload song'
                                                </p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                } */}
                            </Col>
                        </Row>

                    </Container>
                }

            </>
        );
    }
}

export default Collaboration;