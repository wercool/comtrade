import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import { withStyles } from '@material-ui/core/styles';

const styles = {
};

class AddNewProductDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open,
        };

        this.transition = (props) => {
            return <Slide direction="up" {...props} />;
        }
    }
    open() {
        this.setState({ open: true, changed: false });
    }
    render() {
        return (
            <Dialog
                fullScreen
                open={this.state.open}
                TransitionComponent={this.transition}>
                <div>ADD NEW PRODUCT DIALOG</div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddNewProductDialog);