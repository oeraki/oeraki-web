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

            professional_content: 'A musician performing arts full-time, looking to network & collaborate with other musicians',
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
    registerWithEmail() {
        console.log(this.state)
    }
    // END: Methods for registering user

    // START: Methods for user infos
    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleConfirmPasswordChange(event) {
        this.setState({ confirm_password: event.target.value })
    }
    handleMusicianTypeChange(value) {
        this.setState({ musician_type: value })
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
                                        <Button block color="secondary" type="button" id="professional-btn" onClick={() => this.handleMusicianTypeChange("professional")}>
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
                                        <Button block color="secondary" type="button" id="casual-btn" onClick={() => this.handleMusicianTypeChange("casual")}>
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