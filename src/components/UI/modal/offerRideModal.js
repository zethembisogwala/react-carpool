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

const OfferRideModal = (props) => {
  const [userToOffer, setUserToOffer] = useState({});
  useEffect(() => {
    props.setAppState({ ...props.appState, isBusy: true });
    if (props.selectedTrip) {
      axios
        .get(
          `https://janev-2e278.firebaseio.com/users/${props.selectedTrip.userId}.json`
        )
        .then((response) => {
          setUserToOffer(response.data);
          props.setAppState({ ...props.appState, isBusy: false });
        })
        .catch((error) => {
          console.log(error);
          props.setAppState({ ...props.appState, isBusy: false, error: true });
        });
    }
  }, [props.selectedTrip]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const onConfirmClicked = () => {
    props.setAppState({ ...props.appState, isBusy: true });
    props.setOpen(false);
    axios
      .post("https://janev-2e278.firebaseio.com/rideOffers.json", {
        ...props.selectedTrip,
        offererId: props.appState.currentUserId,
      })
      .then((response) => {
        props.setAppState({ ...props.appState, isBusy: false });
      })
      .catch((error) => {
        props.setAppState({ ...props.appState, isBusy: false, error: true });
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
          {`Do you want to offer a ride to ${userToOffer.fullName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {userToOffer.fullName} will get a message that you want to ride with
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

export default OfferRideModal;
