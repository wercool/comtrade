import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import AddNewProductDialog from './dialog/add.new.product.dialog';

import Product from '../../../models/product';

import './list.css';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.addNewProductDialog = React.createRef();
        this.openAddNewProductDialogAction = this.openAddNewProductDialogAction.bind(this);

        this.state = {
            addNewProductDialogIsOpened: false,
            listLoading: false,
            listPermitted: true,
            productList: []
        };

        this.getList = this.getList.bind(this)
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        this.setState({ listLoading: true });

        this.props.app.services.productService.getList()
        .then(productList => {
            productList = productList.map(product => {
                return new Product().map(product);
            });
            this.setState({ productList: productList, listLoading: false });
            console.table(this.state.productList);
        })
        .catch(error => {
            if (error.status === 403) this.setState({ listLoading: false, listPermitted: false });
        });
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
                {this.state.listLoading && <LinearProgress />}

                {this.state.listPermitted && !this.state.listLoading &&
                    <Paper className="tablePaper" square={true}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Thumbnail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.productList.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        <img src={product.thumbnail} alt={product.name} height="50"/>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                }

                {!this.state.listPermitted &&
                    <Typography variant="headline" component="span" align="center">
                        <Icon className="error">lock</Icon>
                    </Typography>
                }
            </React.Fragment>
        );
    }
}

export default ProductList;