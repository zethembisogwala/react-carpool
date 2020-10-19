import React, { useState, useEffect } from "react";
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
  const [userToRequestFrom, setUserToRequestFrom] = useState({});

  const handleClose = () => {
    props.setOpen(false);
  };

  const onConfirmClicked = () => {
    axios
      .post("https://janev-2e278.firebaseio.com/rideRequests.json", {
        ...props.selectedTrip,
        requestorId: props.currentUserId,
      })
      .then((response) => {
        
      })
      .catch((error) => {
        
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Do you want to request a ride from ${userToRequestFrom.fullName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {userToRequestFrom.fullName} will get a message that you want to ride with
            them
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
    </div>
  );
};

export default RequestRideModal;
