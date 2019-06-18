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
      databaseRef: firebase.firestore()
      // END: States for Firebase + Current User
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user }, () => {
        if (this.state.user !== null) {
          // If user logged in & does not have data in database, initiate user data
          console.log(this.state.user)
          const db = this.state.databaseRef
          let userData = db.collection("users").doc(this.state.user.uid)
          userData.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              console.log('User data already existed in database')
            } else {
              // Initiate user data
              console.log('User data not found in database. Initiating data...')
              userData.set({
                description: 'A musician who just joined Corner!',
                email: this.state.user.email,
                address: 'Singapore', //Hardcoded value, will change in the future
                avatar: this.state.user.photoURL,
                fans: [],
                reviews: [],
                skills: ['Musician'],
                type: 'musician',
                username: this.state.user.email.split('@')[0]
              })
              .then(function () {
                console.log("Successfully Initiate User Data");
              })
              .catch(function (error) {
                console.error("Error Initiating User Data: ", error);
              });
            }
          })
          
        }})
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
