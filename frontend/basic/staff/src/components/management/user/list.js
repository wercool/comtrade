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
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddNewUserDialog from './dialog/add.new.user.dialog';

import User from '../../../models/user';

import './list.css';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.addNewUserDialog = React.createRef();
        this.openAddNewUserDialogAction = this.openAddNewUserDialogAction.bind(this);

        this.state = {
            listLoading: false,
            listPermitted: true,
            addNewUserDialogIsOpened: false,
            userList: []
        };

        this.getList = this.getList.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        this.setState({ listLoading: true });
        this.props.app.services.userService.getList()
        .then(userList => {
            userList = userList.map(user => {
                return new User().map(user);
            });
            this.setState({ userList: userList, listLoading: false });
            console.table(this.state.userList);
        })
        .catch(error => {
            if (error.status === 403) this.setState({ listLoading: false, listPermitted: false });
        });
    }
    openAddNewUserDialogAction() {
        document.activeElement.blur();
        this.addNewUserDialog.open();
    }
    render() {
        return (
            <React.Fragment>

                <AddNewUserDialog app={this.props.app} innerRef={node => this.addNewUserDialog = node} onComplete={this.getList} open={this.state.addNewUserDialogIsOpened}/>

                <Divider/>
                <div className="userListTools">
                    <Grid container spacing={8} alignItems="center" justify="space-between">
                        <Grid item>
                            <Tooltip title="Add New User" disableFocusListener={true}>
                                <Fab color="primary" aria-label="Add User" size="medium" onClick={this.openAddNewUserDialogAction}>
                                    <Icon>person_add</Icon>
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Icon>search</Icon>
                                </Grid>
                                <Grid item>
                                    <TextField label="Search by email@, person name" style={{minWidth: 250, marginRight: '2mm'}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Divider/>
                <Paper className="tablePaper" square={true}>
                    <Typography variant="subheading" component="span" align="center">
                        USERS
                        {this.state.listLoading && <LinearProgress />}
                    </Typography>
                    {this.state.listPermitted &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Person Name</TableCell>
                                    <TableCell align="right">Groups</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.userList.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.personName}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    }
                    {!this.state.listPermitted &&
                        <Typography variant="headline" component="span" align="center">
                            <Icon className="error">lock</Icon>
                        </Typography>
                    }
                </Paper>
            </React.Fragment>
        );
    }
}

export default UserList;