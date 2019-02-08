import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';

// import * as EmailValidator from 'email-validator';

import { withRouter } from 'react-router-dom';

import './index.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.app.services.authService.isAuthenticated()) {
      this.props.history.push('/dashboard');
    }

    this.submitted = false;

    this.state = {
      formFields: {
        email: '',
        password: ''
      },
      formFieldsValidationMessages: {
        email: '',
        password: ''
      }
    };
  }
  handleChange(field, event){
    let formFields = this.state.formFields;
    formFields[field] = event.target.value;
    this.setState({formFields});
  }
  loginSubmit(event) {
    event.preventDefault();
    this.submitted = true;


console.log('ASSUMED AUTHENTICATED WITHOUT VALIDATION');
this.props.app.services.authService.authenticated = true;
this.props.history.push('/dashboard');


//     let formFieldsValidationMessages = {
//         email: '',
//         password: ''
//     };
//     if (this.state.formFields.email === '') {
//       formFieldsValidationMessages.email = 'Email is required';
//     } else if (!EmailValidator.validate(this.state.formFields.email)) {
//       formFieldsValidationMessages.email = 'Enter valid email address, please';
//     }
//     if (this.state.formFields.password === '') {
//       formFieldsValidationMessages.password = 'Password is required';
//     }
//     this.setState({formFieldsValidationMessages: formFieldsValidationMessages});

//     let valid = true;
//     for (let errorField in formFieldsValidationMessages) {
//       if (formFieldsValidationMessages[errorField] !== '') valid = false;
//     }
//     if (valid) {
// console.log('ASSUMED AUTHENTICATED');
// this.props.app.services.authService.authenticated = true;
// this.props.history.push('/dashboard');
// // set first entry in history to mirror the last entry
// this.props.history[0] = this.props.history[this.props.history.length - 1];
// // remove all but first history entry
// this.props.history.length = 1;
//     }
  }
  render() {
    return (
      <div className="loginComponentContainer">
      <form name="loginForm" onSubmit={this.loginSubmit.bind(this)}>
          <Card className="loginCard" raised={true}>
            <CardHeader
              avatar={
                <Avatar aria-label="Login">
                  <Icon>perm_identity</Icon>
                </Avatar>
              }
              title="Comtrade Staff"
              subheader="Authentication"
            />
            <CardContent>
              <FormControl className="loginCardFormControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email"
                      autoFocus={true}
                      placeholder="Email address"
                      onChange={this.handleChange.bind(this, "email")} value={this.state.formFields["email"]}
                      aria-describedby="email-helper-text" type="email"/>
                      {
                        this.state.formFieldsValidationMessages.email === '' && !this.submitted
                        ?
                        <FormHelperText id="email-helper-text">We'll never share your email</FormHelperText>
                        :
                        <FormHelperText id="email-helper-text"><span className="error">{this.state.formFieldsValidationMessages.email}</span></FormHelperText>
                      }
              </FormControl>
              <FormControl className="loginCardFormControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" 
                      onChange={this.handleChange.bind(this, "password")} value={this.state.formFields["password"]}
                      aria-describedby="password-helper-text" type="password"/>
                      {
                        this.state.formFieldsValidationMessages.password !== '' && this.submitted
                        ?
                        <FormHelperText id="email-helper-text"><span className="error">{this.state.formFieldsValidationMessages.password}</span></FormHelperText>
                        : ''
                      }
              </FormControl>
            </CardContent>
            <CardActions className="loginCardActions">
              <Button color="primary" type="submit">
                LOGIN
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);