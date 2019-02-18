import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';

import FileUpload from '../../../common/file.upload';

import { withStyles } from '@material-ui/core/styles';

import Product from '../../../../models/product';

const styles = {
    appBar: {
        position: 'relative',
    }
};

class AddNewProductDialog extends React.Component {
    constructor(props) {
        super(props);

        this.product = new Product();
        this.productImageCanvas = React.createRef();

        this.state = {
            product: this.product,
            open: this.props.open,
            changed: false,
            confirmation: false,
            errors: {
                name: [],
                image: [],
            },
            apiError: null
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.forcedlyClose = this.forcedlyClose.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.transition = (props) => {
            return <Slide direction="up" {...props} />;
        }
    }
    open() {
        this.product = new Product();
        this.setState({ open: true, product: this.product, changed: false });
    }
    close() {
        if (this.state.changed) {
            this.setState({ confirmation: true });
        } else {
            this.forcedlyClose();
        }
    }
    save(event) {
        if (event) event.preventDefault();
        if (this.validateForm()) {
            // console.log(this.product);
            this.props.app.services.productService.add(this.product)
            .then(product => {
                this.forcedlyClose();
                this.props.onComplete();
            })
            .catch(error => {
                console.log(error);
                this.setState({ apiError: error.statusText });
            });
        } else {
            this.setState({ confirmation: false });
        }
    }
    validateForm() {
        let errors = {
            name: [],
            image: [],
        };

        if (this.state.product.name.length === 0) {
            errors.name.push('Product name is required');
        }

        if (this.state.product.image === null) {
            errors.image.push('Product image is required');
        }

        let validForm = true;
        for (let errorType in errors) {
            if (errors[errorType].length > 0) {
                validForm = false;
                break;
            }
        }

        this.setState({ errors: errors });

        return validForm;
    }
    forcedlyClose() {
        this.setState({
            confirmation: false,
            errors: {
                name: [],
                image: [],
            },
            open: false 
        });
    }
    handleChange(event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;

        this.product[inputName] = inputValue;

        this.setState({product: this.product, changed: true});
    }
    handleImageChange(event) {
        let inputFile = event.target.files[0];

        let productImageCanvas = this.productImageCanvas.current;
        productImageCanvas.width = 256;
        productImageCanvas.height = 256;
        let canvasCtx = productImageCanvas.getContext('2d');
        let fileReader  = new FileReader();
        let productImage = new Image();
        productImage.onload = function() {

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = productImage.width;
            canvas.height = productImage.height;
            ctx.drawImage(productImage, 0, 0);
            this.product.image = canvas.toDataURL();

            let ratio = productImage.width / productImage.height;
            let sclaedWidth = 256 * ratio;
            productImageCanvas.width = sclaedWidth;
            canvasCtx.drawImage(productImage, 0, 0, sclaedWidth, 256);
            this.product.thumbnail = productImageCanvas.toDataURL();

            this.validateForm();
        }
        productImage.onload = productImage.onload.bind(this);
        fileReader.onloadend = function () {
            productImage.src = fileReader.result;
        }
        fileReader.readAsDataURL(inputFile);

        this.setState({product: this.product, changed: true});
    }
    render() {
        return (
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.close}
                TransitionComponent={this.transition}>
                <AppBar className={this.props.classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.close} aria-label="Close">
                            <Icon>close</Icon>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="appBarLabel">
                            Add New Product
                        </Typography>
                        <Button color="inherit" type="submit" onClick={this.save}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <form noValidate autoComplete="off" className="noselect" onSubmit={this.save}>
                    <Paper square={true}>
                        <Typography variant="subheading" className="formPadding">
                            <FormControl fullWidth={true}>
                                <TextField
                                        name="name"
                                        error={this.state.errors.name.length > 0}
                                        value={this.state.product.name}
                                        onChange={this.handleChange}
                                        label="Product Name"
                                        margin="normal"
                                        variant="outlined"
                                        type="email"
                                        required={true}
                                        autoFocus={true}
                                        fullWidth={true}
                                />
                                {
                                    this.state.errors.name.map((error, i) => {
                                        return (<FormHelperText key={i} error>{error}</FormHelperText>)
                                    })
                                }
                            </FormControl>
                            <div className="formBlock fullWIdth">
                                <div className={this.state.errors.image.length > 0 ? 'error' : ''}>Product Image {this.state.errors.image.length > 0 ? ' *' : ''}</div>
                                <canvas id="productImageCanvas" ref={this.productImageCanvas} height="0" style={{ maxWidth: '75vw'}}/>
                                <div>
                                    <FileUpload handleChange={this.handleImageChange} id="image" name="image"/>
                                </div>
                            </div>
                            {
                                this.state.errors.image.map((error, i) => {
                                    return (<FormHelperText key={i} error>{error}</FormHelperText>)
                                })
                            }
                        </Typography>
                    </Paper>
                </form>

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.confirmation}
                    fullWidth={true}>
                    <DialogTitle>Save changes?</DialogTitle>
                    <DialogActions>
                        <Button 
                            onClick={this.save}
                            color="primary">
                            YES
                        </Button>
                        <Button 
                            onClick={this.forcedlyClose}
                            color="primary">
                            NO
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.apiError != null}
                        autoHideDuration={2000}
                        message={this.state.apiError}
                        onClose={() => { this.setState({ apiError: null }); }}>
                </Snackbar>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddNewProductDialog);