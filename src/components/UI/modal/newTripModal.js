import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {
  const [tripData, setTripData] = useState({
    from: "",
    to: "",
    isDriver: false,
  });
  let actionButtonText = "rides";
  if (tripData.isDriver) {
    actionButtonText = "people";
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const setFrom = (e) => {
    setTripData({ ...tripData, from: e.target.value });
  };

  const setTo = (e) => {
    setTripData({ ...tripData, to: e.target.value });
  };

  const setDriver = () => {
    setTripData({ ...tripData, isDriver: !tripData.isDriver });
  };

  const handleActionButtonClicked = () => {
    props.setIsBusy(true);
    props.setOpen(false);
    setTimeout(() => {
      props.setIsBusy(false);
      props.history.push("/trips");
    }, 500);
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
          {"Where are you going?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tell us where you're going and we'll show you a calendar of people
            who want to carpool, just like yourself.
          </DialogContentText>
          <TextField
            onChange={setFrom}
            value={tripData.from}
            autoFocus
            margin="dense"
            id="from"
            label="From"
            type="text"
            fullWidth
          />
          <TextField
            onChange={setTo}
            value={tripData.to}
            margin="dense"
            id="to"
            label="To"
            type="text"
            fullWidth
          />
          <p>
            <FormControlLabel
              control={<Checkbox onChange={setDriver} color="default" />}
              label="I will use my own car"
            />
          </p>
        </DialogContent>
        <DialogActions style={{padding: 18}}>
          <Button onClickHandler={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClickHandler={handleActionButtonClicked} color="primary">
            Find {actionButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(Modal);
