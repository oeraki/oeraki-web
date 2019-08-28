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
    Col
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.loginWithEmail = this.loginWithEmail.bind(this)
        this.loginWithGoogle = this.loginWithGoogle.bind(this)
        this.logout = this.logout.bind(this)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.state = {
            email: '',
            password: '',
            user: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user: user })
            if (this.state.user) {
                console.log('User logged in')
                console.log(this.state.user)
            } else {
                console.log('No user logged in')
            }
        });
    }

    loginWithEmail() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                alert('Login successfully')
            })
            .catch((error) => {
                let errorCode = error.code
                let errorMessage = error.message
                let messageToShow = errorCode + ': ' + errorMessage
                alert(messageToShow)
            })
    }

    loginWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                // var user = result.user;
                // ...
                alert('Login successfully')
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
                let messageToShow = errorCode + ': ' + errorMessage
                alert(messageToShow)
            });

    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                console.log('Sign out successfully')
            })
            .catch((error) => {
                let errorCode = error.code
                let errorMessage = error.message
                let messageToShow = errorCode + ': ' + errorMessage
                alert(messageToShow)
            })
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <>
                {!this.state.user && 
                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">
                            {/* <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        href="#pablo"
                                        onClick={this.loginWithGoogle}
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
                                    <p>Sign in with credentials</p>
                                </div>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
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
                                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin"
                                        >
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div> */}
                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="button" onClick={this.loginWithEmail}>
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        {/* <Row className="mt-3">
                            <Col xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </Col>
                            <Col className="text-right" xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Create new account</small>
                                </a>
                            </Col>
                        </Row> */}
                    </Col>
                }
                {this.state.user &&
                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">
                            <div className="text-muted text-center mt-2 mb-3">
                                <small>Signed in as {this.state.user.email}</small>
                            </div>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={this.logout}
                            >
                                <i className="ni ni-user-run"></i>
                                <span className="btn-inner--text">Logout</span>
                            </Button>
                        </Card>
                    </Col>
                }
            </>
        );
    }
}

export default Login;