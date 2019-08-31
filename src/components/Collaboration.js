import React from "react";
import Header from './Header';
import { 
    Card, 
    CardBody, 
    CardTitle, 
    Container, 
    Row, 
    Col, 
    CardImg, 
    Badge, 
    Button, 
    Modal, 
    CardHeader, 
    CardText, 
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import firebase from '../firebase';

class Collaboration extends React.Component {
    constructor(props) {
        super(props)

        // START: Listeners for Musician Detail Toggle
        this.toggleMusicianDetail = this.toggleMusicianDetail.bind(this)
        // END: isteners for Musician Detail Toggle

        // START: Listeners for Opening Video Modal
        this.setCurrentVideo = this.setCurrentVideo.bind(this)
        this.toggleVideoModal = this.toggleVideoModal.bind(this)
        // START: Listeners for Opening Video Modal

        // START: Listeners for Opening Messenger Modal
        this.toggleMessengerModal = this.toggleMessengerModal.bind(this)
        // START: Listeners for Opening Messenger Modal

        // START: Listeners for sending message
        this.sendMessage = this.sendMessage.bind(this)
        this.handleMessageContentChange = this.handleMessageContentChange.bind(this)
        // END: Listeners for sending message

        this.state = {
            // START: States for Firestore
            databaseRef: firebase.firestore(),
            user: firebase.auth().currentUser,
            // END: States for Firestore

            // START: States for Musicians
            musicians: [],
            currentMusician: null,
            showMusicianDetail: false,
            // END: States for Musicians

            // START: States for uploaded video list
            uploaded_videos: [],
            current_video: null,
            videoModal: false,
            thumbnailURL: '',
            videoURL: '',
            // END: States for uploaded video list

            // START: States for Messenger
            messengerModal: false,
            message_content: '',
            messages: []
            // END: States for Messenger
        }
    }

    // START: Methods for REACT Life Cycle
    componentDidMount() {
        let db = this.state.databaseRef
        let self = this

        // Listener on events
        db.collection("users").onSnapshot(function (querySnapshot) {
            var musicians = [];
            querySnapshot.forEach(function (doc) {
                let musician = doc.data()
                musician['id'] = doc.id
                musicians.push(musician);
            });
            self.setState({
                musicians: musicians
            })
            // console.log(self.state.musicians)
        });
    }
    // END: Methods for REACT Life Cycle

    // START: Methods for Musician Detail Toggle
    toggleMusicianDetail(musician) {
        let db = this.state.databaseRef
        let self = this

        if (musician) {
            db.collection("users").doc(musician.id).collection("videos").get().then(function (querySnapshot) {
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
                console.log(self.state.uploaded_videos)
                console.log(self.state.currentMusician)
                console.log(self.state.user)
            });
        } else {
            self.setState({
                showMusicianDetail: !self.state.showMusicianDetail,
                currentMusician: musician,
                uploaded_videos: []
            })
            console.log(self.state.uploaded_videos)
            console.log(self.state.currentMusician)
            console.log(self.state.user)
        }
    }
    // END: Methods for Musician Detail Toggle

    // START: Methods for Opening Video Modal
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
    // END: Methods for Opening Video Modal

    // START: Methods for Messenger Modal
    toggleMessengerModal() {
        this.setState({
            messengerModal: !this.state.messengerModal,
        })
    }
    // END: Methods for Messenger Modal

    // START: Method for sending message
    sendMessage() {
        let self_user_id = this.state.user.uid
        let target_user_id = this.state.currentMusician.id

        // Identify conversation_id
        let conversation_id = 'default_conversation_id'
        if (self_user_id > target_user_id) {
            conversation_id = self_user_id + '_' + target_user_id
        } else {
            conversation_id = target_user_id + '_' + self_user_id
        }

        // Send message
        let message_content = this.state.message_content
        if (message_content !== '') {
            let db = this.state.databaseRef
            let conversation_ref = db.collection('conversations').doc(conversation_id)
            // Save message_content in database, with randomly generated ID
            conversation_ref.collection('messages').add({
                content: message_content,
                ownerId: self_user_id,
                timestamp: Date.now()
            })
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({ message_content: '' })
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            })
        }
    }

    handleMessageContentChange(event) {
        let new_message_content = event.target.value
        this.setState({ message_content: new_message_content })
    }
    // END: Method for sending message

    render() {
        const messengerBox = {
            width: '100%',
            height: '400px'
        }
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
                        {/* START: List of musicians */}
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
                                            <video width="100%" controls>
                                                <source src={this.state.current_video.videoSource} type="video/mp4">
                                                </source>
                                            </video>
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
                        {/* Doing */}
                        
                        {/* START: Modal for Messenger */}
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.messengerModal}
                            toggle={this.toggleMessengerModal}
                            size="lg"
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent">
                                        <span>
                                            Connect with <span className="mt-3 mb-0 text-muted text-sm">{this.state.currentMusician.username}</span>
                                        </span>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={this.toggleMessengerModal}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </CardHeader>
                                    <CardBody>
                                        <div style={messengerBox}>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <InputGroup className="input-group-alternative mb-4">
                                                <Input 
                                                    type="text" 
                                                    placeholder="Say something..."
                                                    onChange={this.handleMessageContentChange}
                                                    value={this.state.message_content}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText
                                                        onClick={this.sendMessage}
                                                    >
                                                        <span className="text-primary">
                                                            {/* <i className="fas fa-paper-plane" /> */}
                                                            Send
                                                        </span>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                    </CardBody>
                                </Card>

                            </div>
                        </Modal>
                        {/* END: Modal for Messenger */}

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
                                                onClick={this.toggleMessengerModal}
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
                                                        <span className="heading">{this.state.uploaded_videos.length}</span>
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
                                            {/* Doing */}
                                            <div>
                                                <i className="ni education_hat mr-2" />
                                                {this.state.currentMusician.type} musician
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
                                                        {/* {video.views} views<br></br> */}
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
                                {this.state.uploaded_videos.length === 0 &&
                                    <Card
                                        className="bg-secondary shadow"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <CardBody>
                                            <div className="py-3 text-center">
                                                <i className="ni ni-image ni-3x" />
                                                <h4 className="heading mt-4">Nothing to see here...</h4>
                                                <p>
                                                    It seems this musician have not uploaded any music videos
                                                </p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                }
                            </Col>
                        </Row>

                    </Container>
                }

            </>
        );
    }
}

export default Collaboration;