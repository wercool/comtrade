import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import AddNewProductDialog from './dialog/add.new.product.dialog';

import './list.css';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.addNewProductDialog = React.createRef();
        this.openAddNewProductDialogAction = this.openAddNewProductDialogAction.bind(this);

        this.state = {
            addNewProductDialogIsOpened: false
        };
    }
    getList() {

    }
    openAddNewProductDialogAction() {
        document.activeElement.blur();
        this.addNewProductDialog.open();
    }
    render() {
        return (
            <React.Fragment>
                <AddNewProductDialog app={this.props.app} innerRef={node => this.addNewProductDialog = node} onComplete={this.getList} open={this.state.addNewProductDialogIsOpened}/>
                <div className="productListTools">
                    <Grid container spacing={8} alignItems="center" justify="space-between">
                        <Grid item>
                            <Tooltip title="Add New Product" disableFocusListener={true}>
                                <Fab color="primary" aria-label="Add Product" size="medium" onClick={this.openAddNewProductDialogAction}>
                                    <Icon>library_add</Icon>
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Icon>search</Icon>
                                </Grid>
                                <Grid item>
                                    <TextField label="Search by product name, code" style={{minWidth: 250, marginRight: '2mm'}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Divider/>
            </React.Fragment>
        );
    }
}

export default ProductList;