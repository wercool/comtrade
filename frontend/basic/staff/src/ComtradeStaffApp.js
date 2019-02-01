import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import Header from './components/header/index';
import Footer from './components/footer/index';
import Login from './components/login/index';

class ComtradeStaffApp extends React.Component {
  constructor(props) {
    super();
    this.services = props.services;
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <Header app={this}/>

            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>

            <Footer/>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default ComtradeStaffApp;
