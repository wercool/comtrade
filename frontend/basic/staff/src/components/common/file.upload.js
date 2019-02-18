import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class FileUpload extends React.Component {
  render() {
    const { id, name, handleChange } = this.props;
    return (
      <React.Fragment>
        <input id={id} type="file" accept=".gif,.jpg,.jpeg,.png" onChange={handleChange} name={name} style={{display: 'none'}} />
        <label htmlFor={id} id={`${id}`}>
          <Button variant="contained" component="span">
            <Icon>add_a_photo</Icon>
          </Button>
        </label>
      </React.Fragment>
    );
  }
}

export default FileUpload;