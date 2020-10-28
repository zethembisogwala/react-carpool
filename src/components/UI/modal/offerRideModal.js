import React from "react";
import { connect } from "react-redux";

import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import * as actionCreators from "../../../store/actions/actionCreators";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OfferRideModal = (props) => {
  
  const handleClose = () => {
    props.setOfferRideModalIsOpen(false);
  };

  const onConfirmClicked = () => {
    props.offerRide({ ...props.selectedTrip, offerorId: props.currentUserId });
  };

  return (
    <div>
      <Dialog
        open={props.userToOffer && !props.isBusy}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Do you want to offer a ride to ${props.userToOffer.fullName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.userToOffer.fullName} will get a message that you want to
            ride with them
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
    offerRide: (rideOffer) =>
      dispatch(actionCreators.postRideOfferStart(rideOffer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferRideModal);
