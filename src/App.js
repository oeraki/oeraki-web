import React, { Component } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user })
    });
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
