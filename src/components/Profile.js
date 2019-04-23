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
    FormGroup
} from "reactstrap";
import Dropzone from 'react-dropzone'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.toggleUploadModal = this.toggleUploadModal.bind(this)

        this.state = {
            uploadModal: false
        }
    }

    toggleUploadModal() {
        this.setState({
            uploadModal: !this.state.uploadModal
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
                        isOpen={this.state.uploadModal}
                        toggle={this.toggleUploadModal}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                    <span><i className="ni ni-spaceship"></i> Upload Music Video</span>
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
                                <CardBody>
                                    <FormGroup>
                                        <label className="form-control-label">Title</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Title of your song"
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Description</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="A few words about your song ..."
                                            rows="4"
                                            type="textarea"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Thumbnail</label>
                                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div style={fileInputStyle}>
                                                            <span><i className="ni ni-image"></i> Click to select file</span>
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label">Video</label>
                                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div style={fileInputStyle}>
                                                            <span><i className="ni ni-note-03"></i> Click to select file</span>
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
                                        >
                                            Upload
                                        </Button>
                                    </div>
                                </CardBody>
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
                        <Card className="bg-secondary shadow" style={{marginBottom: '10px'}}>
                            <CardHeader>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={require("../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </span>
                                        <span style={{marginLeft: '10px'}}>
                                            <span className="mb-0 text-sm font-weight-bold"> Jessica Jones</span> 
                                            <span className="mb-0 text-sm"> uploaded</span> 
                                            <span className="mb-0 text-sm text-muted"> 14 mins ago</span> 
                                        </span>
                                    </div>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='6'>
                                        <CardImg src='https://upload.wikimedia.org/wikipedia/commons/3/37/Childish_Gambino.jpg'></CardImg>
                                    </Col>
                                    <Col xs='auto'>
                                        <CardTitle className="font-weight-bold mb-0">
                                            Never been this way
                                        </CardTitle>
                                        <span className="mt-3 mb-0 text-muted text-sm">
                                            by Childish Gambino<br></br>
                                            143k views<br></br>
                                            3:30
                                        </span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="bg-secondary shadow" style={{ marginBottom: '10px' }}>
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
                                        <CardImg src='https://upload.wikimedia.org/wikipedia/commons/3/37/Childish_Gambino.jpg'></CardImg>
                                    </Col>
                                    <Col xs='auto'>
                                        <CardTitle className="font-weight-bold mb-0">
                                            Never been this way
                                    </CardTitle>
                                        <span className="mt-3 mb-0 text-muted text-sm">
                                            by Childish Gambino<br></br>
                                            143k views<br></br>
                                            3:30
                                    </span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="bg-secondary shadow" style={{ marginBottom: '10px' }}>
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
                                        <CardImg src='https://upload.wikimedia.org/wikipedia/commons/3/37/Childish_Gambino.jpg'></CardImg>
                                    </Col>
                                    <Col xs='auto'>
                                        <CardTitle className="font-weight-bold mb-0">
                                            Never been this way
                                    </CardTitle>
                                        <span className="mt-3 mb-0 text-muted text-sm">
                                            by Childish Gambino<br></br>
                                            143k views<br></br>
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

export default Profile;