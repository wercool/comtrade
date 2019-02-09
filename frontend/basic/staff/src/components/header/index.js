import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, withRouter } from 'react-router-dom';

import './index.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
        this.menu = [
            {label: 'Dashboard', icon: 'dashboard', path: '/dashboard'},
            {label: 'Product Management', icon: 'pages', path: '/dashboard/management/product'},
            {label: 'Inventory Management', icon: 'store', path: '/dashboard/management/inventory'},
            {label: 'Auction Management', icon: 'gavel', path: '/dashboard/management/auction'},
            {label: 'User Management', icon: 'supervisor_account', path: '/dashboard/management/user'},
            {label: 'Notification Management', icon: 'notification_important', path: '/dashboard/management/notification'},
        ];
        this.menuList = (
            <List>
            {this.menu.map((menuItem) => (
                <ListItem button key={menuItem.label} onClick={() => { this.menuNavigate(menuItem.path); }}>
                    <ListItemIcon><Icon>{menuItem.icon}</Icon></ListItemIcon>
                    <ListItemText primary={menuItem.label} />
                </ListItem>
            ))}
            </List>
        );
        this.toggleMenu = (menuState) => () => {
            this.setState({
                menuOpen: menuState
            });
        };
    }
    menuNavigate(path) {
        this.setState({
            menuOpen: false
        });
        this.props.history.push(path);
    }
    handleLogout(event) {
        this.props.app.services.authService.logout();
        this.props.history.push('/login');
        // set first entry in history to mirror the last entry
        this.props.history[0] = this.props.history[this.props.history.length - 1];
        // remove all but first history entry
        this.props.history.length = 1;
    }
    render() {
        return (
            <div className="header">
                <AppBar position="static">
                    <Toolbar>
                        <Grid
                        justify="space-between"
                        container 
                        spacing={24}>
                            <Grid item>
                                <Typography variant="h6" color="inherit">
                                {
                                    this.props.app.services.authService.isAuthenticated() ?
                                    (
                                        <Fab color="primary" aria-label="Menu" size="small" onClick={this.toggleMenu(true)}>
                                            <Icon>menu</Icon>
                                        </Fab>
                                    ) : ('')
                                }
                                    <Link to="/dashboard" className="link appBarTitle noselect">Comtrade Staff</Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    !this.props.app.services.authService.isAuthenticated()  ?
                                    (
                                        <Button color="inherit" component={Link} to="/login">LOGIN</Button>
                                    )
                                    :
                                    (
                                        <Button color="inherit" onClick={ this.handleLogout.bind(this) }>LOGOUT</Button>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            {
                this.props.app.services.authService.isAuthenticated() ?
                (
                    <SwipeableDrawer
                                    open={this.state.menuOpen}
                                    onClose={this.toggleMenu(false)}
                                    onOpen={this.toggleMenu(true)}
                                    >
                        {this.menuList}
                    </SwipeableDrawer>
                ) : ('')
            }

            </div>
        );
  }
}

export default withRouter(Header);