import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from './components/header/index';
import Footer from './components/footer/index';
import Login from './components/login/index';
import URLNoMath from './components/404/index';
import DashboardContainer from './components/dashboard/container';

const PrivateRoute = ({component: Component, ...params}) => {
    return <Route
        render={
            props=>{
                return params.app.services.authService.isAuthenticated() ?
                    (
                        <Component {...params} />
                    )
                    :
                    (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />
                    )
            }
        }
    />
};

class ComtradeStaffApp extends React.Component {
  constructor(props) {
    super(props);
    this.services = this.props.services;
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <Header app={ this }/>

            <Switch>
              <Route exact path="/" render={() => ( <Redirect to="/dashboard"/> )}/>
              <Route exact path="/login" render={() => <Login app={ this } /> } />
              <PrivateRoute path="/dashboard" component={ DashboardContainer } app={ this }/>
              <Route component={URLNoMath} />
            </Switch>

            <Footer/>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default ComtradeStaffApp;
