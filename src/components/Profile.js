import React from "react";
import Header from './Header';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    Container,
    Row,
    Col,
    Modal,
    Input,
    FormGroup,
    Progress
} from "reactstrap";
import Dropzone from 'react-dropzone'
import firebase from '../firebase'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.toggleUploadModal = this.toggleUploadModal.bind(this)
        this.toggleVideoModal = this.toggleVideoModal.bind(this)

        this.handleSongDescriptionChange = this.handleSongDescriptionChange.bind(this)
        this.handleSongTitleChange = this.handleSongTitleChange.bind(this)
        this.handleThumbnailFileChange = this.handleThumbnailFileChange.bind(this)
        this.handleVideoFileChange = this.handleVideoFileChange.bind(this)

        this.uploadSong = this.uploadSong.bind(this)
        this.uploadAgain = this.uploadAgain.bind(this)

        this.state = {
            uploadModal: false,
            videoModal: false,

            songTitle: '',
            songDescription: '',
            storageRef: firebase.storage().ref(),
            databaseRef: firebase.firestore(),
            user: firebase.auth().currentUser,
            thumbnailFile: null,
            videoFile: null,
            thumbnailURL: '',
            videoURL: '',
            uploadStatus: null,
            uploadPercentage: 0,
            shouldUploadVideoInfo: false,

            uploaded_videos: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If there were changes on both thumbnailURL and videoURL
        if (this.state.shouldUploadVideoInfo && this.state.shouldUploadVideoInfo !== prevState.shouldUploadVideoInfo) {
            // Not sure how we should implement this best. Heres the 2 ways of doing it:
            
            // let db = this.state.databaseRef
            // db.collection("videos").add({
            //     owner: this.state.user.uid,
            //     thumbnail: this.state.thumbnailURL,
            //     videoSource: this.state.videoURL,
            //     comments: [],
            //     views: 0,
            //     tips: {
            //         '5': 0,
            //         '10': 0,
            //         '15': 0
            //     },
            //     title: this.state.songTitle,
            //     description: this.state.songDescription
            // })
            // .then(function (docRef) {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch(function (error) {
            //     console.error("Error adding document: ", error);
            // })

            let db = this.state.databaseRef
            db.collection("users").doc(this.state.user.uid).collection("videos").add({
                owner: this.state.user.uid,
                thumbnail: this.state.thumbnailURL,
                videoSource: this.state.videoURL,
                comments: [],
                views: 0,
                tips: {
                    '5': 0,
                    '10': 0,
                    '15': 0
                },
                title: this.state.songTitle,
                description: this.state.songDescription
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
        }
    }

    componentDidMount() {
        let db = this.state.databaseRef
        let self = this

        // Listener on current user's uploaded videos
        db.collection("users").doc(this.state.user.uid).collection("videos")
            .onSnapshot(function (querySnapshot) {
                var uploaded_videos = [];
                querySnapshot.forEach(function (doc) {
                    uploaded_videos.push(doc.data());
                });
                self.setState({
                    uploaded_videos: uploaded_videos
                })
            });
    }

    toggleUploadModal() {
        this.setState({
            uploadModal: !this.state.uploadModal
        })
    }

    toggleVideoModal(video) {
        this.setState({
            videoModal: !this.state.videoModal,
        })
    }

    handleSongTitleChange(event) {
        this.setState({ songTitle: event.target.value })
    }

    handleSongDescriptionChange(event) {
        this.setState({ songDescription: event.target.value })
    }

    handleThumbnailFileChange(files) {
        this.setState({ thumbnailFile: files[0] })
    }

    handleVideoFileChange(files) {
        this.setState({ videoFile: files[0] })
    }

    uploadAgain() {
        this.setState({ 
            uploadStatus: null, 
            uploadPercentage: 0,
            thumbnailFile: null,
            videoFile: null,
            songTitle: '',
            songDescription: '',
            thumbnailURL: '',
            videoURL: '',
            shouldUploadVideoInfo: false
        })
    }

    uploadSong() {
        console.log(this.state.songTitle)
        console.log(this.state.songDescription)
        console.log(this.state.thumbnailFile)
        console.log(this.state.videoFile)

        const thumbnailName = this.state.thumbnailFile.name
        const videoName = this.state.videoFile.name

        let thumbnailUploadTask = this.state.storageRef.child('images/' + thumbnailName).put(this.state.thumbnailFile);
        let videoUploadTask = this.state.storageRef.child('videos/' + videoName).put(this.state.videoFile);

        this.setState({ uploadStatus: 'uploading' })

        let self = this

        thumbnailUploadTask.on('state_changed', function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Thumbnail upload is ' + progress + '% done')
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            thumbnailUploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('Thumbnail file available at', downloadURL)
                self.setState({ thumbnailURL: downloadURL})
                if (self.state.thumbnailURL !== '' && self.state.videoURL !== '') {
                    self.setState({ shouldUploadVideoInfo: true })
                }
            })
        })

        videoUploadTask.on('state_changed', function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Video upload is ' + progress + '% done')
            self.setState({ uploadPercentage: progress.toFixed(2) })
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            videoUploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('Video file available at', downloadURL)
                self.setState({ videoURL: downloadURL })
                if (self.state.thumbnailURL !== '' && self.state.videoURL !== '') {
                    self.setState({ shouldUploadVideoInfo: true })
                }
                self.setState({ uploadPercentage: 100, uploadStatus: 'done' })
            })
        })

    }

    render() {
        const fileInputStyle = {
            height: '70px',
            width: '100%',
            backgroundColor: 'transparent',
            borderRadius: '10px',
            borderWidth: '4px',
            borderStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.videoModal}
                        toggle={this.toggleVideoModal}
                        size="lg"
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                    <span>Video Modal</span>
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
                                    <div className="py-3 text-center">
                                        <i className="ni ni-satisfied ni-3x" />
                                        <h4 className="heading mt-4">Hooray!</h4>
                                        <p>
                                            This is video modal
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                    
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.uploadModal}
                        toggle={this.toggleUploadModal}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                    <span>Upload Music Video</span>
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={this.toggleUploadModal}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                </CardHeader>
                                {!this.state.uploadStatus &&
                                    <CardBody>
                                        <FormGroup>
                                            <label className="form-control-label">Title</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Title of your song"
                                                type="text"
                                                onChange={this.handleSongTitleChange}
                                                value={this.state.songTitle}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="form-control-label">Description</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="A few words about your song ..."
                                                rows="4"
                                                type="textarea"
                                                onChange={this.handleSongDescriptionChange}
                                                value={this.state.songDescription}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="form-control-label">Thumbnail</label>
                                            <Dropzone
                                                onDrop={this.handleThumbnailFileChange}
                                                multiple={false}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <div style={fileInputStyle}>
                                                                {!this.state.thumbnailFile &&
                                                                    <span><i className="ni ni-image"></i> Click to select file</span>
                                                                }
                                                                {this.state.thumbnailFile &&
                                                                    <span>{this.state.thumbnailFile.name}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="form-control-label">Video</label>
                                            <Dropzone
                                                onDrop={this.handleVideoFileChange}
                                                multiple={false}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <div style={fileInputStyle}>
                                                                {!this.state.videoFile &&
                                                                    <span><i className="ni ni-note-03"></i> Click to select file</span>
                                                                }
                                                                {this.state.videoFile &&
                                                                    <span>{this.state.videoFile.name}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="button"
                                                onClick={this.uploadSong}
                                            >
                                                Upload
                                        </Button>
                                        </div>
                                    </CardBody>
                                }
                                {this.state.uploadStatus === 'uploading' &&
                                    <CardBody>
                                        <div className="progress-wrapper">
                                            <div className="progress-info">
                                                <div className="progress-label">
                                                    <span>Uploading "{this.state.songTitle}"...</span>
                                                </div>
                                                <div className="progress-percentage">
                                                    <span>{this.state.uploadPercentage}%</span>
                                                </div>
                                            </div>
                                        <Progress max="100" value={this.state.uploadPercentage} />
                                        </div>
                                    </CardBody>
                                }
                                {this.state.uploadStatus === 'done' &&
                                    <CardBody>
                                        <div className="py-3 text-center">
                                            <i className="ni ni-satisfied ni-3x" />
                                            <h4 className="heading mt-4">Hooray!</h4>
                                            <p>
                                                Your awesome song has been uploaded
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="button"
                                                onClick={this.uploadAgain}
                                            >
                                                Upload Again
                                            </Button>
                                        </div>
                                    </CardBody>
                                }
                            </Card>
                            
                        </div>
                    </Modal>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img
                                        alt="..."
                                        className="rounded-circle"
                                        src={require("../assets/img/theme/team-4-800x800.jpg")}
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
                                    onClick={this.toggleUploadModal}
                                    size="sm"
                                    >
                                    Upload song
                                    </Button>
                                    <Button
                                    className="float-right"
                                    color="default"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                    size="sm"
                                    >
                                    Edit profile
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                            <Row>
                                <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                    <div>
                                    <span className="heading">22</span>
                                    <span className="description">Fans</span>
                                    </div>
                                    <div>
                                    <span className="heading">10</span>
                                    <span className="description">Albums</span>
                                    </div>
                                    <div>
                                    <span className="heading">89</span>
                                    <span className="description">Songs</span>
                                    </div>
                                </div>
                                </div>
                            </Row>
                            <div className="text-center">
                                <h3>
                                Jessica Jones
                                <span className="font-weight-light">, 27</span>
                                </h3>
                                <div className="h5 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                Bucharest, Romania
                                </div>
                                <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2" />
                                Songwriter - Rapper - Producer
                                </div>
                                {/* <div>
                                <i className="ni education_hat mr-2" />
                                University of Computer Science
                                </div> */}
                                <hr className="my-4" />
                                <p>
                                I love making independent music. Eager to collaborate with like-minded artists
                                </p>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                See reviews
                                </a>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        {this.state.uploaded_videos.map((video, index) => (
                            <Card 
                                className="bg-secondary shadow" 
                                style={{ marginBottom: '10px' }} 
                                onClick={this.toggleVideoModal}
                            >
                                <CardHeader>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={require("../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </span>
                                        <span style={{ marginLeft: '10px' }}>
                                            <span className="mb-0 text-sm font-weight-bold"> Jessica Jones</span>
                                            <span className="mb-0 text-sm"> uploaded</span>
                                            <span className="mb-0 text-sm text-muted"> 14 mins ago</span>
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs='6'>
                                            <CardImg src={video.thumbnail}></CardImg>
                                        </Col>
                                        <Col xs='auto'>
                                            <CardTitle className="font-weight-bold mb-0">
                                                {video.title}
                                            </CardTitle>
                                            <span className="mt-3 mb-0 text-muted text-sm">
                                                by Childish Gambino<br></br>
                                                {video.views} views<br></br>
                                                3:30
                                        </span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        ))}
                    </Col>
                </Row>
                </Container>
            </>
        );
    }
}

export default Profile;