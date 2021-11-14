import React, {Component} from 'react';
import {Alert, AlertTitle, Snackbar, Typography} from "@mui/material";

class AutoHideAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState(() => ({open: false}));
  };


  render() {
    const {type, title, body, delayMs} = this.props;

    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={delayMs}
        onClose={this.handleClose}
        sx={{position: 'static'}}
      >
        <Alert severity={type} variant="filled" sx={{width: '100%'}} onClose={this.handleClose}>
          <AlertTitle>
            {title}
          </AlertTitle>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Alert>
      </Snackbar>
    );
  }
}

export default AutoHideAlert;
