import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles'

import './add.new.user.css';

const styles = {
    appBar: {
        position: 'relative',
    },
};

class AddNewUserDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.onAltClose = this.onAltClose.bind(this);

        this.transition = (props) => {
            return <Slide direction="up" {...props} />;
        }
    }
    open() {
        this.setState({ open: true });
    }
    close() {
        this.setState({ open: false });
    }
    save(event) {
        if (event) event.preventDefault();
        console.log(this);
    }
    onAltClose(event, reason) {
        this.close();
    }
    render() {
        return (
            <form noValidate autoComplete="off" className="noselect" onSubmit={this.save}>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.onAltClose}
                    TransitionComponent={this.transition}>
                    <AppBar className={this.props.classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.close} aria-label="Close">
                                <Icon>close</Icon>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className="appBarLabel">
                                Add New User
                            </Typography>
                            <Button color="inherit" onClick={this.save} type="submit">
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Paper square={true}>
                        <Typography variant="subheading" className="formPadding">
                            <TextField className="fullWidth"
                                    id="email"
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    autoFocus={true}
                            />
                        </Typography>
                    </Paper>
                </Dialog>
            </form>
        );
    }
}

export default withStyles(styles)(AddNewUserDialog);