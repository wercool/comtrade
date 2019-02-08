import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles'

import './add.new.user.css';

const styles = {
    root: {
        margin: '4mm',
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
        this.onClose = this.onClose.bind(this);
    }
    open() {
        this.setState({ open: true });
    }
    close() {
        this.setState({ open: false });
    }
    onClose(event, reason) {
        this.close();
    }
    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.onClose}>
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.close} aria-label="Close">
                            <Icon>close</Icon>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="appBarLabel">
                            Add New User
                        </Typography>
                        <Button color="inherit" onClick={this.handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper square={true}>
                <Typography variant="subheading">
                    New User
                </Typography>
                </Paper>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddNewUserDialog);