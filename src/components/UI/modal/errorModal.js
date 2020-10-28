import React from "react";
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actionCreators';

import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorModal = (props) => {
  const handleClose = () => {
    props.setError(false);
  };

  return (
    <div>
      <Dialog
        open={props.error !== false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`An error occurred`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Something went wrong, try again later. {props.error.toString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: 18 }}>
          <Button onClickHandler={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setError: () => dispatch(actionCreators.setError(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
