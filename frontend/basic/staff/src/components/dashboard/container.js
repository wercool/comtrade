import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Dashboard from './index';
import UserManagement from '../management/user/index';
import ProductManagement from '../management/product/index';
import InventoryManagement from '../management/inventory/index';
import AuctionManagement from '../management/auction/index';
import NotificationManagement from '../management/notification/index';

class DashboardContainer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/dashboard" render={() => ( <Dashboard app={this.props.app} /> )}/>
                    <Route exact path="/dashboard/management/user" render={() => ( <UserManagement app={this.props.app} /> )}/>
                    <Route exact path="/dashboard/management/product" render={() => ( <ProductManagement app={this.props.app} /> )}/>
                    <Route exact path="/dashboard/management/inventory" render={() => ( <InventoryManagement app={this.props.app} /> )}/>
                    <Route exact path="/dashboard/management/auction" render={() => ( <AuctionManagement app={this.props.app} /> )}/>
                    <Route exact path="/dashboard/management/notification" render={() => ( <NotificationManagement app={this.props.app} /> )}/>
                </Switch>

            </React.Fragment>
        );
    }
}

export default withRouter(DashboardContainer);