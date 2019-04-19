import React, { Component } from 'react'
import { Button, Jumbotron } from "reactstrap";

class ActionBoxes extends Component {
    render() {
        return (
            <div>
                <Jumbotron style={styles.jumbotronStyle}>
                    <h2>Join The Conversation</h2>
                    <p>Frozen has been singing for the past 3 years. She loves going to gigs and love R&B song requests.</p>
                    <hr className="my-2" />
                    <p>Tip Frozen if you love her music</p>
                    <p className="lead">
                        <Button color="primary">$1</Button>
                        <Button color="primary">$5</Button>
                        <Button color="primary">$10</Button>
                        <Button color="primary">$25</Button>
                        <Button color="primary">$50</Button>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

const styles = {
    jumbotronStyle: {
        backgroundColor: 'white',
        padding: '20px 20px 20px 20px'
    }

}

export default ActionBoxes;