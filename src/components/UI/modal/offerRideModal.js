import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import * as actionCreators from "../../../store/actions/actionCreators";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OfferRideModal = (props) => {
  const [userToOffer, setUserToOffer] = useState({});
  useEffect(() => {
    if (props.selectedTrip) {
      props.fetchUserToOffer(props.selectedTrip.userId);
    }
  }, [props.selectedTrip]);

  const handleClose = () => {
    props.setOfferRideModalIsOpen(false);
  };

  const onConfirmClicked = () => {
    props.offerRide({ ...props.selectedTrip, offerorId: props.currentUserId });
  };

  return (
    <div>
      <Dialog
        open={props.offerRideModalIsOpen}
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

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOfferRideModalIsOpen: (open) =>
      dispatch(actionCreators.setOfferRideModalIsOpen(open)),
    fetchUserToOffer: (id) =>
      dispatch(actionCreators.fetchUserById(id, actionCreators.setUserToOffer)),
    offerRide: (rideOffer) =>
      dispatch(actionCreators.postRideOfferStart(rideOffer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferRideModal);
