import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions///actionCreators";
import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RequestRideModal = (props) => {
  useEffect(() => {
    if (props.selectedTrip) {
      props.fetchUserToRequestFrom(props.selectedTrip.userId);
    }
  }, [props.selectedTrip]);

  const handleClose = () => {
    props.setRequestRideModalIsOpen(false);
  };

  const onConfirmClicked = () => {
    props.requestRide({
      ...props.selectedTrip,
      requestorId: props.currentUserId,
    });
  };

  return (
    <div>
      {props.userToRequestFrom && (
        <Dialog
          open={props.requestRideModalIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Do you want to request a ride from ${props.userToRequestFrom.fullName}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.userToRequestFrom.fullName} will get a message that you
              want to ride with them
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: 18 }}>
            <Button onClickHandler={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClickHandler={onConfirmClicked} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRequestRideModalIsOpen: (open) =>
      dispatch(actionCreators.setRequestRideModalIsOpen(open)),
    fetchUserToRequestFrom: (id) =>
      dispatch(
        actionCreators.fetchUserById(id, actionCreators.setUserToRequestFrom)
      ),
    requestRide: (rideRequest) =>
      dispatch(actionCreators.postRideRequestStart(rideRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestRideModal);
