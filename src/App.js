import React, { Component } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route path="/auth" render={props => <Auth {...props} />} />
      //     <Redirect from="/" to="/auth/login" />
      //   </Switch>
      // </BrowserRouter>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" render={props => <Dashboard {...props} />} />
          <Redirect from="/" to="/dashboard/feed" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
