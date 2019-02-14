import React from 'react';
import ReactDOM from 'react-dom';
import ComtradeStaffApp from './ComtradeStaffApp';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import './index.css';

/**
 * Services import
 */
import APIService from './services/api';
import PublicService from './services/public';
import AuthService from './services/auth';
import UserService from './services/user';

console.log('Version: ' + process.env.REACT_APP_VERSION);

/**
 * Services initialization
 */
const apiService = new APIService();
const services = {
    publicService: new PublicService(apiService),
    authService: new AuthService(apiService),
    userService: new UserService(apiService)
};

ReactDOM.render(<ComtradeStaffApp 
                                 services={services}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
