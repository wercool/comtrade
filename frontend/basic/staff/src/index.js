import React from 'react';
import ReactDOM from 'react-dom';
import ComtradeStaffApp from './ComtradeStaffApp';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import './index.css';

/**
 * Services import
 */
import AuthService from './services/auth';

console.log(process.env.REACT_APP_VERSION);

/**
 * Services initialization
 */
const services = {
    authService: new AuthService()
};

ReactDOM.render(<ComtradeStaffApp 
                                 services={services}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
