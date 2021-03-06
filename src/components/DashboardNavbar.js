import React from "react";
import { Link } from "react-router-dom";
import firebase from '../firebase';
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media
} from "reactstrap";

class DashboardNavbar extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            user: firebase.auth().currentUser,
            databaseRef: firebase.firestore(),
            userMetadata: {
                avatar: '',
                username: ''
            },
        }
    }

    componentDidMount() {
        let db = this.state.databaseRef
        let self = this

        // Listener on current user's metadata
        db.collection("users").doc(this.state.user.uid).onSnapshot(function (doc) {
            console.log("Current userMetadata: ", doc.data());
            self.setState({
                userMetadata: {
                    avatar: doc.data().avatar,
                    username: doc.data().username
                }
            })
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

    render() {
        return (
            <>
                <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                    <Container fluid>
                        <Link
                            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                            to="/"
                        >
                            {this.props.brandText}
                        </Link>
                        <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                            <FormGroup className="mb-0">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-search" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Search" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        <Nav className="align-items-center d-none d-md-flex" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={this.state.userMetadata.avatar}
                                            />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">
                                                {this.state.userMetadata.username}
                                        </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Settings</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Activity</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-support-16" />
                                        <span>Support</span>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="#pablo" onClick={this.logout}>
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default DashboardNavbar;