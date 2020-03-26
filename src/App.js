import React from 'react';
import { Spin } from 'antd';
import './App.css';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { LogIn } from './pages/LogIn';
import { Landing } from './pages/LandingPage';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { auth } from './services/firebase'

// object destructoring
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

// object destructoring
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/home' />}
    />
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }
  render() {
    // senteralize spin in the middle of the page 
    return this.state.loading === true ? <div className="loading-container">
      <Spin size="large" />
      <h2 className="loading-title">Loading Neighbor...</h2>
    </div> : (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute path="/home" authenticated={this.state.authenticated} component={Home} />
            <PublicRoute path="/signup" authenticated={this.state.authenticated} component={SignUp} />
            <PublicRoute path="/login" authenticated={this.state.authenticated} component={LogIn} />
          </Switch>
        </Router>
      )

  }
}

export default App;

