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

import './index.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }
  render() {
    return (
      <div className="loginComponentContainer">
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
              <Input id="email" aria-describedby="email-helper-text" type="email"/>
              <FormHelperText id="email-helper-text">We'll never share your email</FormHelperText>
            </FormControl>
            <FormControl className="loginCardFormControl">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" aria-describedby="password-helper-text" type="password"/>
            </FormControl>
          </CardContent>
          <CardActions className="loginCardActions">
            <Button color="primary">
              LOGIN
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Login;