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
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {
  const userId = props.appState.currentUserId;
  const [tripData, setTripData] = useState({
    from: "",
    to: "",
    date: Date.now(),
    isDriver: false,
    userId: `${userId}`,
    valid: false,
    offers: [],
    requests: [],
  });
  let actionButtonText = "rides";
  if (tripData.isDriver) {
    actionButtonText = "people";
  }

  const handleClose = () => {
    props.setAppState(prevState => {
      return { ...prevState, newTripModalIsOpen: false }
    });
  };

  const setFrom = (e) => {
    if (e.target.value) {
      const from = e.target.value;
      setTripData((prevData) => {
        return {
          ...prevData,
          from: from,
          valid: prevData.to !== "",
        };
      });
    }
  };

  const setTo = (e) => {
    if (e.target.value) {
      const to = e.target.value;
      setTripData((prevData) => {
        return {
          ...prevData,
          to: to,
          valid: prevData.from !== "",
        };
      });
    }
  };

  const setDriver = () => {
    setTripData((prevData) => {
      return { ...prevData, isDriver: !prevData.isDriver };
    });
  };

  const handleActionButtonClicked = () => {
    props.setAppState((prevState) => {
      return {
        ...prevState,
        newTripModalIsOpen: false,
        isBusy: true,
      };
    });

    if (tripData.valid && tripData.userId) {
      axios
        .post("https://janev-2e278.firebaseio.com/trips.json", tripData)
        .then((response) => {
          props.setAppState(prevState => {
            return { ...prevState, isBusy: false }
          });
          props.history.push("/trips");
        })
        .catch((error) => {
          props.setAppState(prevState => {
            return { ...prevState, isBusy: false, error: true }
          });
        });
    } else {
      props.setAppState(prevState => {
        return { ...prevState, error: true }
      });
    }
  };

  return (
    <div>
      <Dialog
        open={props.appState.newTripModalIsOpen}
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
        <DialogActions style={{ padding: 18 }}>
          <Button onClickHandler={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClickHandler={handleActionButtonClicked} color="primary">
            {props.location.pathname === "/trips"
              ? "Continue"
              : `Find ${actionButtonText}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(Modal);
