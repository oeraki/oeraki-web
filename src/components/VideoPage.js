import React from "react";
import { Container, Col, Row } from "reactstrap";
import Header from './Header';
import Video from './Video';
import ActionBoxes from "./ActionContainer";

class VideoPage extends React.Component {

    render() {
        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <Col>
                            <Video />
                        </Col>
                        <Col>
                            <ActionBoxes />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default VideoPage;
