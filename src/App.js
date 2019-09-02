import React, { Component } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // START: States for Firebase + Current User
      user: null,
      // END: States for Firebase + Current User
    }
  }

  componentDidMount() {
    this.unsub_user = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user })
    });
  }

  componentWillUnmount() {
    this.unsub_user && this.unsub_user()
  }

  render() {
    return (
      <>
        {!this.state.user &&
          <BrowserRouter>
            <Switch>
              <Route path="/auth" render={props => <Auth {...props} />} />
              <Redirect from="/" to="/auth/login" />
            </Switch>
          </BrowserRouter>
        }
        
        {this.state.user &&
          <BrowserRouter>
            <Switch>
              <Route path="/dashboard" render={props => <Dashboard {...props} />} />
              <Redirect from="/" to="/dashboard/profile" />
            </Switch>
          </BrowserRouter>
        }
      </>
    );
  }
}

export default App;
