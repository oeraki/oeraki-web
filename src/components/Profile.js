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
    Progress,
    Badge,
    CardText
} from "reactstrap";
import Dropzone from 'react-dropzone'
import firebase from '../firebase'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        // START: Listeners for Opening Video Modal
        this.toggleVideoModal = this.toggleVideoModal.bind(this)
        this.setCurrentVideo = this.setCurrentVideo.bind(this)
        // END: Listeners for Opening Video Modal

        // START: Listeners for Uploading Song
        this.toggleUploadModal = this.toggleUploadModal.bind(this)
        this.handleSongDescriptionChange = this.handleSongDescriptionChange.bind(this)
        this.handleSongTitleChange = this.handleSongTitleChange.bind(this)
        this.handleThumbnailFileChange = this.handleThumbnailFileChange.bind(this)
        this.handleVideoFileChange = this.handleVideoFileChange.bind(this)
        this.uploadSong = this.uploadSong.bind(this)
        this.uploadAgain = this.uploadAgain.bind(this)
        // END: Listeners for Uploading Song

        // START: Listeners for Editing Profile
        this.toggleEditModal = this.toggleEditModal.bind(this)
        this.handleProfileDescriptionChange = this.handleProfileDescriptionChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleAvatarChange = this.handleAvatarChange.bind(this)
        this.handleSkillsChange = this.handleSkillsChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
        // END: Listeners for Editing Profile

        // START: Listeners for Music Video Setting
        this.removeVideo = this.removeVideo.bind(this)
        // END: Listeners for Music Video Setting

        // START: Listeners for Seeing Reviews
        this.seeReview = this.seeReview.bind(this)
        // END: Listeners for Seeing Reviews

        this.state = {
            // START: States for Uploading Song
            uploadModal: false,
            songTitle: '',
            songDescription: '',
            thumbnailFile: null,
            videoFile: null,
            uploadStatus: null,
            uploadPercentage: 0,
            shouldUploadVideoInfo: false,
            // END: States for Uploading Song

            // START: States for Editing Profile
            editModal: false,
            profileDescription: '',
            profileAddress: '',
            profileAvatar: null,
            profileSkills: [],
            profileUsername: '',
            // END: States for Editing Profile

            // START: States for Firebase + Current User
            storageRef: firebase.storage().ref(),
            databaseRef: firebase.firestore(),
            user: firebase.auth().currentUser,
            userMetadata: {
                address: '',
                description: '',
                username: '',
                skills: [],
                avatar: '',
                type: ''
            },
            // END: States for Firebase + Current User
            
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
                ownerName: this.state.userMetadata.username,
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
                description: this.state.songDescription,
                timestamp: Date.now()
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
        db.collection("users").doc(this.state.user.uid).collection("videos").onSnapshot(function (querySnapshot) {
                var uploaded_videos = [];
                querySnapshot.forEach(function (doc) {
                    let uploaded_video = doc.data()
                    uploaded_video['id'] = doc.id
                    uploaded_videos.push(uploaded_video);
                });
                self.setState({
                    uploaded_videos: uploaded_videos
                })
        });

        // Listener on current user's metadata
        db.collection("users").doc(this.state.user.uid).onSnapshot(function (doc) {
            console.log("Current userMetadata: ", doc.data());
            if (doc.data()) {
                self.setState({
                    userMetadata: {
                        skills: doc.data().skills,
                        username: doc.data().username,
                        address: doc.data().address,
                        description: doc.data().description,
                        avatar: doc.data().avatar,
                        type: doc.data().type
                    }
                })
            }
        });
    }
    // END: Methods for REACT Life Cycle

    // START: Methods for Opening Video Modal
    toggleVideoModal(video) {
        this.setState({
            videoModal: !this.state.videoModal,
        })
    }
    setCurrentVideo(video) {
        console.log('Current video:')
        console.log(video)
        this.setState({
            current_video: video,
            videoModal: !this.state.videoModal,
        })
    }
    // END: Methods for Opening Video Modal

    // START: Methods for Uploading Song
    toggleUploadModal() {
        this.setState({
            uploadModal: !this.state.uploadModal
        })
    }
    handleSongDescriptionChange(event) {
        this.setState({ songDescription: event.target.value })
    }
    handleSongTitleChange(event) {
        this.setState({ songTitle: event.target.value })
    }
    handleThumbnailFileChange(files) {
        this.setState({ thumbnailFile: files[0] })
    }
    handleVideoFileChange(files) {
        this.setState({ videoFile: files[0] })
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
                self.setState({ thumbnailURL: downloadURL })
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
    // END: Methods for Uploading Song

    // START: Methods for Editing Profile
    toggleEditModal() {
        let self = this
        let db = this.state.databaseRef

        // Get latest info for current User Profile
        db.collection("users").doc(this.state.user.uid).get().then(function (doc) {
            console.log("Current userMetadata: ", doc.data());
            self.setState({
                userMetadata: {
                    skills: doc.data().skills,
                    username: doc.data().username,
                    address: doc.data().address,
                    description: doc.data().description,
                    avatar: doc.data().avatar,
                    type: doc.data().type
                },
                editModal: !self.state.editModal,
            })
        });
    }
    handleProfileDescriptionChange(event) {
        let new_userMetadata = this.state.userMetadata
        new_userMetadata.description = event.target.value
        this.setState({ userMetadata: new_userMetadata })
    }
    handleAddressChange(event) {
        let new_userMetadata = this.state.userMetadata
        new_userMetadata.address = event.target.value
        this.setState({ userMetadata: new_userMetadata })
    }
    handleAvatarChange(event) {
        let new_userMetadata = this.state.userMetadata
        new_userMetadata.avatar = event.target.value
        this.setState({ userMetadata: new_userMetadata })
    }
    handleSkillsChange(event) {
        let new_userMetadata = this.state.userMetadata
        new_userMetadata.skills = event.target.value.split(',')
        this.setState({ userMetadata: new_userMetadata })
    }
    handleUsernameChange(event) {
        let new_userMetadata = this.state.userMetadata
        new_userMetadata.username = event.target.value
        this.setState({ userMetadata: new_userMetadata })
    }
    submitEdit() {
        let db = this.state.databaseRef
        db.collection("users").doc(this.state.user.uid).update({
            skills: this.state.userMetadata.skills,
            username: this.state.userMetadata.username,
            address: this.state.userMetadata.address,
            description: this.state.userMetadata.description,
            avatar: this.state.userMetadata.avatar
        });
        this.setState({
            editModal: !this.state.editModal
        })
    }
    // END: Methods for Editing Profile

    // START: Methods for Music Video Setting
    removeVideo(video) {
        if (window.confirm('Are you sure you want to remove this music video?')) {
            let db = this.state.databaseRef
            db.collection("users")
                .doc(this.state.user.uid)
                .collection("videos")
                .doc(video.id)
            .delete().then(function () {
                console.log('Music Video Removed');
            }).catch(function (error) {
                console.error("Error removing Music Video: ", error);
            });
        } else {
            console.log('Music Video Removal cancelled')
        }
    }
    // END: Methods for Music Video Setting

    // START: Methods for Seeing Reviews
    seeReview() {
        alert('This feature is not available yet')
        // Dummy function
        // let db = this.state.databaseRef
        // let batch = db.batch()
        // for (var i = 0; i < 8; i++) {
        //     batch.set(db.collection("events").doc(), {
        //         title: '',
        //         owner: '',
        //         time: '',
        //         description: '',
        //         pay: '',
        //         location: '',
        //         type: ''
        //     })
        // }
        // batch.commit().then(function () {
        //     console.log('All events uploaded')
        // });
    }
    // END: Methods for Seeing Reviews

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
                                            by {this.state.userMetadata.username}
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

                    {/* START: Modal for Editing Profile */}
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.editModal}
                        toggle={this.toggleEditModal}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                    <span>Edit Profile</span>
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={this.toggleEditModal}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <label className="form-control-label">Username</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Your new username"
                                            type="text"
                                            onChange={this.handleUsernameChange}
                                            value={this.state.userMetadata.username}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Description</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="A few words about yourself ..."
                                            rows="4"
                                            type="textarea"
                                            onChange={this.handleProfileDescriptionChange}
                                            value={this.state.userMetadata.description}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Address</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Where are you now?"
                                            rows="4"
                                            type="textarea"
                                            onChange={this.handleAddressChange}
                                            value={this.state.userMetadata.address}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Skills (Separate by comma)</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Tell us about your skills (Hint: If you have multiple skills, use commas to separate them)"
                                            rows="4"
                                            type="textarea"
                                            onChange={this.handleSkillsChange}
                                            value={this.state.userMetadata.skills}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Avatar (URL)</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Put the URL of your new avatar picture here (Hint: The URL should be valid)"
                                            rows="4"
                                            type="textarea"
                                            onChange={this.handleAvatarChange}
                                            value={this.state.userMetadata.avatar}
                                        />
                                        {/* <Dropzone
                                            onDrop={this.handleAvatarChange}
                                            multiple={false}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div style={fileInputStyle}>
                                                            {!this.state.profileAvatar &&
                                                                <span><i className="ni ni-image"></i> Click to change your avatar</span>
                                                            }
                                                            {this.state.profileAvatar &&
                                                                <span>{this.state.profileAvatar.name}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone> */}
                                    </FormGroup>
                                    
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            onClick={this.submitEdit}
                                        >
                                            Save Profile
                                    </Button>
                                    </div>
                                </CardBody>
                            </Card>

                        </div>
                    </Modal>
                    
                    {/* END: Modal for Editing Profile */}

                    
                    {/* START: Modal for Uploading Song */}
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
                    {/* END: Modal for Uploading Song */}
                
                    {/* START: Info of current + List of uploaded videos */}
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
                                            src={this.state.userMetadata.avatar}
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
                                        onClick={this.toggleEditModal}
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
                                        {/* <div>
                                        <span className="heading">22</span>
                                        <span className="description">Fans</span>
                                        </div>
                                        <div>
                                        <span className="heading">10</span>
                                        <span className="description">Albums</span>
                                        </div> */}
                                        <div>
                                        <span className="heading">{this.state.uploaded_videos.length}</span>
                                        <span className="description">Songs</span>
                                        </div>
                                    </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <h3>
                                    {this.state.userMetadata.username}
                                    {/* <span className="font-weight-light">, 27</span> */}
                                    </h3>
                                    <div className="h5 font-weight-300">
                                    <i className="ni location_pin mr-2" />
                                    {this.state.userMetadata.address}
                                    </div>
                                    <div className="h5 mt-4">
                                    <i className="ni business_briefcase-24 mr-2" />
                                    {this.state.userMetadata.skills.length > 0 && this.state.userMetadata.skills.map((skill, index) => (
                                        <span key={index}><Badge color="primary">{skill}</Badge> </span>
                                    ))}
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        {this.state.userMetadata.type} musician
                                    </div>
                                    <hr className="my-4" />
                                    <p>
                                    {this.state.userMetadata.description}
                                    </p>
                                    <a href="#pablo" onClick={this.seeReview}>
                                    See reviews
                                    </a>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            {/* START: List of uploaded videos */}
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
                                                    src={this.state.userMetadata.avatar}
                                                />
                                            </span>
                                            <span style={{ marginLeft: '10px' }}>
                                                <span className="mb-0 text-sm font-weight-bold"> {video.ownerName}</span>
                                                <span className="mb-0 text-sm"> uploaded on </span>
                                                <span className="mb-0 text-sm text-muted"> 
                                                    {new Date(video.timestamp).getUTCDate()}/
                                                    {new Date(video.timestamp).getUTCMonth()+1}/
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
                                                    {/* 3:30 */}
                                                    <Button color="secondary" size="sm" 
                                                        type="button"
                                                        onClick={() => this.removeVideo(video)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i> Remove
                                                    </Button>
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
                                                It seems you have not uploaded any music videos
                                                <br></br>
                                                Click 'Upload song'
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            }
                            {/* END: List of uploaded videos */}
                        </Col>
                    </Row>
                    {/* END: Info of current + List of uploaded videos */}
                </Container>
            </>
        );
    }
}

export default Profile;