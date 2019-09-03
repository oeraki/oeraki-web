import React from "react";
import firebase from '../firebase';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    UncontrolledTooltip
} from "reactstrap";

class Register extends React.Component {
    constructor(props) {
        super(props)

        // START: Methods for registering user
        this.registerWithEmail = this.registerWithEmail.bind(this)
        this.resetUserInfo = this.resetUserInfo.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        // END: Methods for registering user

        // START: Methods for user infos
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
        // this.handleMusicianTypeChange = this.handleMusicianTypeChange.bind(this)
        // END: Methods for user infos

        this.state = {
            // START: States for user infos
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            musician_type: '',
            // END: States for user infos

            professional_content: 'A full-time musician looking to network & collaborate with other musicians',
            casual_content: 'A hobbyist looking to find like-minded friends to play music & jam together'
        }
    }

    // START: Methods for registering user
    resetUserInfo() {
        this.setState({
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            musician_type: ''
        })
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    registerWithEmail() {
        console.log(this.state)
        // Check if email has the correct format
        if (!this.validateEmail(this.state.email)) {
            alert('Your email seems to be incorrect. Please check again!')
            return
        }
        // Check if password is at least 6 characters
        if (this.state.password.length < 6) {
            alert('Your password should be at least 6-character long. Please try again!')
            return
        }
        // Check if password & confirm_password are the same
        if (this.state.password !== this.state.confirm_password) {
            alert('Your confirm password does not match. Please try again!')
            return
        }
        // Check if musician_type are empty or not
        if (this.state.musician_type === '') {
            alert('Type of musician is required. Please try again!')
            return
        }

        console.log('You are good to go')
        var email = this.state.email
        var password = this.state.password
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            alert('New account successfully created')
            // Save user info to the database
            var user = result.user
            var userData = firebase.firestore().collection("users").doc(user.uid)
            userData.set({
                description: 'A musician who just joined Corner!',
                email: user.email,
                address: 'Singapore', //Hardcoded value, will change in the future
                avatar: 'https://firebasestorage.googleapis.com/v0/b/oeraki-f85a5.appspot.com/o/images%2Fdefault_profile.jpg?alt=media&token=d0c42458-6d2b-4cca-91db-1cfaf12a644c',
                fans: [],
                reviews: [],
                skills: ['Musician'],
                type: this.state.musician_type,
                username: this.state.username
            })
            .then(() => {
                console.log('User data initiated successfully')
                // this.resetUserInfo()
            })
            .catch((error) => {
                console.log('Error initiating user data: ' + error)
            })
        })
        .catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert('Error registering account: ' + errorMessage)
        });
    }
    // END: Methods for registering user

    // START: Methods for user infos
    handleUsernameChange(event) {
        this.setState({ username: event.target.value.trim() })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value.trim() })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value.trim() })
    }
    handleConfirmPasswordChange(event) {
        this.setState({ confirm_password: event.target.value.trim() })
    }
    handleMusicianTypeChange(value) {
        this.setState({ musician_type: value.trim() })
    }
    // END: Methods for user infos

    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        {/* <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-4">
                                <small>Sign up with</small>
                            </div>
                            <div className="text-center">
                                <Button
                                    className="btn-neutral btn-icon mr-4"
                                    color="default"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require("../assets/img/icons/common/github.svg")}
                                        />
                                    </span>
                                    <span className="btn-inner--text">Github</span>
                                </Button>
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require("../assets/img/icons/common/google.svg")}
                                        />
                                    </span>
                                    <span className="btn-inner--text">Google</span>
                                </Button>
                            </div>
                        </CardHeader> */}
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <p>Create a new account</p>
                            </div>
                            <Form role="form">
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-circle-08" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Name" type="text" onChange={this.handleUsernameChange}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email" type="email" onChange={this.handleEmailChange}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" type="password" onChange={this.handlePasswordChange}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Confirm password" type="password" onChange={this.handleConfirmPasswordChange}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <div className="text-muted">
                                        <p>
                                            What type of musician are you?
                                            <span className="text-primary"> (Required)</span>
                                        </p>
                                    </div>
                                    <div>
                                        <Button 
                                            block color="secondary" 
                                            type="button" 
                                            id="professional-btn" 
                                            onClick={() => this.handleMusicianTypeChange("professional")}
                                            aria-pressed={true}
                                            className={this.state.musician_type === "professional" ? 'active' : null}
                                        >
                                            <span className="btn-inner--text">Professional</span>
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            placement="right"
                                            target="professional-btn"
                                        >
                                            {this.state.professional_content}
                                        </UncontrolledTooltip>
                                    </div>
                                    <p></p>
                                    <div>
                                        <Button 
                                            block color="secondary" 
                                            type="button" 
                                            id="casual-btn" 
                                            onClick={() => this.handleMusicianTypeChange("casual")}
                                            aria-pressed={true}
                                            className={this.state.musician_type === "casual" ? 'active' : null}
                                        >
                                            <span className="btn-inner--text">Casual</span>
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            placement="right"
                                            target="casual-btn"
                                        >
                                            {this.state.casual_content}
                                        </UncontrolledTooltip>
                                    </div>
                                </FormGroup>
                                {/* <div className="text-muted font-italic">
                                    <small>
                                        password strength:{" "}
                                        <span className="text-success font-weight-700">strong</span>
                                    </small>
                                </div> */}
                                {/* <Row className="my-4">
                                    <Col xs="12">
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheckRegister"
                                                type="checkbox"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customCheckRegister"
                                            >
                                                <span className="text-muted">
                                                    I agree with the{" "}
                                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                                        Privacy Policy
                                                    </a>
                                                </span>
                                            </label>
                                        </div>
                                    </Col>
                                </Row> */}
                                <div className="text-center">
                                    <Button className="mt-4" color="primary" type="button" onClick={this.registerWithEmail}>
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

export default Register;