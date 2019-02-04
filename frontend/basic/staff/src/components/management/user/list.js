import React from 'react';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import AddNewUserDialog from './dialog/add.new.user.dialog';

import './list.css';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.addNewUserDialogOpen = this.addNewUserDialogOpen.bind(this);
        this.state = {
            newUserDialogOpenState: false
        };
    }
    addNewUserDialogOpen() {
        this.setState({
            newUserDialogOpenState: true
        });
    }
    render() {
    return (
        <React.Fragment>
            <Divider/>
            <div className="userListTools">
                <Tooltip title="Add New User">
                    <Fab color="primary" aria-label="Add User" size="medium" onClick={this.addNewUserDialogOpen}>
                        <Icon>person_add</Icon>
                    </Fab>
                </Tooltip>
            </div>
            <Divider/>
            <Paper className="tablePaper" square={true}>
            <Typography variant="subheading" component="span">
                User List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Creation Date</TableCell>
                        <TableCell align="right">Groups</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
            </Paper>

            <AddNewUserDialog app={this.props.app} open={this.state.newUserDialogOpenState}/>
        </React.Fragment>
    );
    }
}

export default UserList;