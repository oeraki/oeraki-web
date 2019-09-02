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
        this.logout = this.logout.bind(this)
        this.validateEmail = this.validateEmail.bind(this)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    loginWithEmail() {
        // Check if email has the correct format
        if (!this.validateEmail(this.state.email)) {
            alert('Your email seems to be incorrect. Please check again!')
            return
        }
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
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
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
            </>
        );
    }
}

export default Login;