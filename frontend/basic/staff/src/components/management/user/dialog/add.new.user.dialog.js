import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

import * as EmailValidator from 'email-validator';

import './add.new.user.css';

import User from '../../../../models/user';

const styles = {
    appBar: {
        position: 'relative',
    },
    chip: {
        margin: '2mm'
    }
};

class AddNewUserDialog extends React.Component {
    constructor(props) {
        super(props);

        this.user = new User();

        this.state = {
            open: this.props.open,
            user: this.user,
            passwordConfirm: '',
            passwordNotConfirmed: false,
            changed: false,
            confirmation: false,
            errors: {
                email: [],
                name: [],
                password: []
            }
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.forcedlyClose = this.forcedlyClose.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.transition = (props) => {
            return <Slide direction="up" {...props} />;
        }
    }
    open() {
        this.setState({ open: true, user: new User(), changed: false });
    }
    close() {
        if (this.state.changed) {
            this.setState({ confirmation: true });
        } else {
            this.forcedlyClose();
        }
    }
    forcedlyClose() {
        this.setState({
            confirmation: false,
            errors: {
                email: [],
                name: [],
                password: []
            },
            open: false 
        });
    }
    save(event) {
        if (event) event.preventDefault();
        console.log(this.state.user);

        let errors = {
            email: [],
            name: [],
            password: []
        };

        if (this.state.user.email.length === 0) {
            errors.email.push('Email is required');
        } else {
            if (!EmailValidator.validate(this.state.user.email)) {
                errors.email.push('Email format is incorrect');
            }
        }
        if (this.state.user.name.length === 0) {
            errors.name.push('Person Name is required');
        }
        if (this.state.user.password.length === 0) {
            errors.password.push('Password is required');
        } else {
            if (this.state.user.password !== this.state.passwordConfirm) {
                errors.password.push('Password does not match');
                this.setState({ passwordNotConfirmed: true });
            } else {
                this.setState({ passwordNotConfirmed: false });
            }
        }

        let validForm = true;
        for (let errorType in errors) {
            if (errors[errorType].length > 0) {
                validForm = false;
                break;
            }
        }

        if (validForm) {
            this.forcedlyClose();
        } else {
            this.setState({ confirmation: false, errors: errors });
        }
    }
    handleChange(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;

        this.user[inputName] = inputValue;

        if (inputName === 'email') this.user.username = this.user.email;

        this.setState({user: this.user, changed: true});
    }
    render() {
        return (
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.close}
                TransitionComponent={this.transition}>
                <AppBar className={this.props.classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.close} aria-label="Close">
                            <Icon>close</Icon>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="appBarLabel">
                            Add New User
                        </Typography>
                        <Button color="inherit" type="submit" onClick={this.save}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <form noValidate autoComplete="off" className="noselect" onSubmit={this.save}>
                    <Paper square={true}>
                        <Typography variant="subheading" className="formPadding">
                            <TextField
                                    name="email"
                                    error={this.state.errors.email.length > 0}
                                    value={this.state.user.email}
                                    onChange={this.handleChange}
                                    label="Email (Username)"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    required={true}
                                    autoFocus={true}
                                    fullWidth={true}
                            />
                            {
                                this.state.errors.email.map((error, i) => {
                                    return (<FormHelperText key={i} error>{error}</FormHelperText>)
                                })
                            }
                            <TextField
                                    name="name"
                                    error={this.state.errors.name.length > 0}
                                    value={this.state.user.name}
                                    onChange={this.handleChange}
                                    label="Person Name"
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    required={true}
                                    fullWidth={true}
                            />
                            {
                                this.state.errors.name.map((error, i) => {
                                    return (<FormHelperText key={i} error>{error}</FormHelperText>)
                                })
                            }
                            <TextField
                                    name="password"
                                    error={this.state.errors.password.length > 0}
                                    value={this.state.user.password}
                                    onChange={this.handleChange}
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    required={true}
                                    fullWidth={true}
                            />
                            {
                                this.state.errors.password.map((error, i) => {
                                    return (<FormHelperText key={i} error>{error}</FormHelperText>)
                                })
                            }
                            <TextField
                                    name="password"
                                    error={this.state.errors.password.length > 0}
                                    onChange={(event) => { this.setState({ passwordConfirm: event.target.value}); }}
                                    label="Password confirmation"
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    required={true}
                                    fullWidth={true}
                            />
                            {
                                this.state.passwordNotConfirmed && 
                                <FormHelperText error>Password does not match</FormHelperText>
                            }
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="roles-input">Roles</InputLabel>
                                <Select
                                    name="roles"
                                    multiple
                                    value={this.state.user.roles}
                                    onChange={this.handleChange}
                                    input={<Input id="roles-input"/>}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={this.props.classes.chip}/>
                                            ))}
                                        </div>
                                    )}
                                >
                                {
                                    this.props.app.services.authService.roles.map(role => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            <br/><br/>
                            <Button color="primary" type="submit" className="floatRight">
                                SAVE
                            </Button>
                            <br/>
                        </Typography>
                    </Paper>
                </form>

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.confirmation}
                    fullWidth={true}>
                    <DialogTitle>Save changes?</DialogTitle>
                    <DialogActions>
                        <Button 
                            onClick={this.save}
                            color="primary">
                            YES
                        </Button>
                        <Button 
                            onClick={this.forcedlyClose}
                            color="primary">
                            NO
                        </Button>
                    </DialogActions>
                </Dialog>

            </Dialog>
        );
    }
}

export default withStyles(styles)(AddNewUserDialog);