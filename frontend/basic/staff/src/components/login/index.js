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
import LinearProgress from '@material-ui/core/LinearProgress';

import * as EmailValidator from 'email-validator';

import { withRouter } from 'react-router-dom';

import './index.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.app.services.authService.isAuthenticated()) {
      this.props.history.push('/dashboard');
    }

    this.state = {
      formFields: {
        username: '',
        password: ''
      },
      formFieldsValidationMessages: {
        username: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    let formFields = this.state.formFields;
    let inputName = event.target.name;
    let inputValue = event.target.value;

    formFields[inputName] = inputValue;

    this.setState({formFields: formFields});
  }
  loginSubmit(event) {
    event.preventDefault();

    let formFieldsValidationMessages = {
        username: '',
        password: ''
    };
    if (this.state.formFields.username === '') {
      formFieldsValidationMessages.username = 'Email is required';
    } else if (!EmailValidator.validate(this.state.formFields.username)) {
      formFieldsValidationMessages.username = 'Enter valid email address, please';
    }
    if (this.state.formFields.password === '') {
      formFieldsValidationMessages.password = 'Password is required';
    }
    this.setState({formFieldsValidationMessages: formFieldsValidationMessages});

    let valid = true;
    for (let errorField in formFieldsValidationMessages) {
      if (formFieldsValidationMessages[errorField] !== '') valid = false;
    }
    if (valid) {
      this.setState({ submitted: true });
      this.props.app.services.authService.authenticate(this.state.formFields.username, btoa(this.state.formFields.password))
      .then(authResponse => {
        this.setState({submitted: false});
        this.props.app.services.authService.setAuthenticated(authResponse.token);

        this.props.history.push('/dashboard');
        // set first entry in history to mirror the last entry
        this.props.history[0] = this.props.history[this.props.history.length - 1];
        // remove all but first history entry
        this.props.history.length = 1;
      })
      .catch(error => {
        //Not Found
        if (error.status === 404) formFieldsValidationMessages.username = 'No account registered with provided email';
        //Unauthorized
        if (error.status === 401) formFieldsValidationMessages.password = 'Password does not match';

        this.setState({submitted: false, formFieldsValidationMessages: formFieldsValidationMessages});
      });
    }
  }
  render() {
    return (
      <div className="loginComponentContainer">
        <form name="loginForm" onSubmit={this.loginSubmit.bind(this)}>
          <Card className="loginCard noselect" raised={true}>
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
              {this.state.submitted && 
                <React.Fragment>
                  <LinearProgress />
                  <br/>
                </React.Fragment>
              }
              <FormControl className="loginCardFormControl">
                <InputLabel htmlFor="username">Email</InputLabel>
                <Input name="username"
                      value={this.state.formFields.username}
                      autoFocus={true}
                      disableUnderline={this.state.submitted}
                      disabled={this.state.submitted}
                      placeholder="Email address"
                      onChange={this.handleChange}
                      aria-describedby="email-helper-text" type="email"/>
                      {this.state.formFieldsValidationMessages.username !== '' && !this.submitted &&
                          <FormHelperText id="email-helper-text"><span className="error">{this.state.formFieldsValidationMessages.username}</span></FormHelperText>
                      }
              </FormControl>
              <FormControl className="loginCardFormControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password"
                      value={this.state.formFields.password}
                      disableUnderline={this.state.submitted}
                      disabled={this.state.submitted}
                      onChange={this.handleChange}
                      aria-describedby="password-helper-text" type="password"/>
                      {this.state.formFieldsValidationMessages.password !== '' && !this.submitted &&
                        <FormHelperText id="password-helper-text"><span className="error">{this.state.formFieldsValidationMessages.password}</span></FormHelperText>
                      }
              </FormControl>
            </CardContent>
            <CardActions className="loginCardActions">
              {!this.state.submitted &&
                <Button color="primary" type="submit">
                  AUTHENTICATE
                </Button>
              }
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);