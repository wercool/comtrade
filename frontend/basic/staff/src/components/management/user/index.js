import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';

import UserList from './list';
import UserGroups from './groups';

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0
    };
    this.tabsHandleChange = (event, value) => {
      this.setState({ 
        activeTabIndex: value
       });
    };
  }
  render() {
    return (
      <React.Fragment>
          <Tabs
            value={this.state.activeTabIndex}
            onChange={this.tabsHandleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="User List" icon={<Icon>person</Icon>} />
            <Tab label="User Groups" icon={<Icon>group</Icon>} />
          </Tabs>

          {this.state.activeTabIndex === 0 && <UserList app={ this.props.app }/>}
          {this.state.activeTabIndex === 1 && <UserGroups app={ this.props.app }/>}

      </React.Fragment>
    );
  }
}

export default UserManagement;