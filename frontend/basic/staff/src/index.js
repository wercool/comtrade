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
 * 
 * 
 * 
 * 
 * Some ES6 exps
 * 
 * 
 * 
 * 
 */

// let obj = {
//     f1: 'field 1',
//     f2: 'field 2'
// };
// const { f1 } = obj;
// let str = `Field1 value: ${f1}`;
// console.log(str);



// let obj1 = { f1: '1', f2: '2'};
// let obj2 = { f3: '3', f4: '4'};
// let obj1obj2 = { ...obj1, ...obj2 };
// let obj2obj1 = { ...obj2, ...obj1 };
// console.log(obj1obj2, obj2obj1);



// const timeout = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// const sum = async(val1, val2) => {
//     await timeout(1000);
//     return val1 + val2;
// }
// const asyncSum = async() => {
//     return {
//         sum1: await sum(1, 1),
//         sum2: await sum(1, 1),
//         sum3: await sum(1, 1),
//     }
// }
// asyncSum().then(result => {
//     const { sum1, sum2, sum3 } = result;
//     console.log(`Result ${ sum1 + sum2 + sum3 }`);
// });









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
