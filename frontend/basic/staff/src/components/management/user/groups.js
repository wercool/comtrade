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

import './group.css';

class UserGroups extends React.Component {
  render() {
    return (
      <React.Fragment>
          <Divider/>
            <div className="userGroupsTools">
                <Fab color="primary" aria-label="Add Group" size="medium">
                    <Icon>group_add</Icon>
                </Fab>
            </div>
          <Divider/>
          <Paper className="tablePaper" square={true}>
            <Typography variant="subheading" component="span">
                User Group List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
          </Paper>
      </React.Fragment>
    );
  }
}

export default UserGroups;