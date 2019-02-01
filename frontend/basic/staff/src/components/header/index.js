import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import './index.css';

class Header extends React.Component {
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
                                    <Link to="/" className="link">Comtrade Staff</Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    !this.props.app.services.authService.authenticated 
                                    ?
                                        <Button color="inherit" component={Link} to="/login">LOGIN</Button>
                                    :
                                        <Button color="inherit">LOGOUT</Button>
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
  }
}

export default Header;