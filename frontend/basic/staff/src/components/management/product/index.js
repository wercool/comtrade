import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ProductList from './list';

class ProductManagement extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Paper square={true} elevation={1}>
          <Typography variant="subheading" align="center">
            PRODUCTS
          </Typography>

          <ProductList app={this.props.app}/>

        </Paper>
      </React.Fragment>
    );
  }
}

export default ProductManagement;