import React, { useState } from "react";
import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import VerticalSpace from "../verticalSpace/verticalSpace";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewUserModal = (props) => {
  const [userData, setUserData] = useState({ fullName: "", phoneNumber: "" });

  const handleClose = () => {
    props.setAppState({ ...props.appState, newUserModalIsOpen: false });
  };

  const onContinueClicked = () => {
    props.setAppState({
      ...props.appState,
      newUserModalIsOpen: false,
      isBusy: true,
    });
    if (userData.fullName.length > 0 && userData.phoneNumber.length > 0) {
      axios
        .post("https://janev-2e278.firebaseio.com/users.json", userData)
        .then((response) => {
          localStorage.setItem("userId", response.data.name);
          props.setAppState(prevState => {
              return {
                ...prevState,
                currentUserId: response.data.name,
                isBusy: false,
                newUserModalIsOpen: false,
                newTripModalIsOpen: true,
              }
          });
        })
        .catch((error) => {
          props.setAppState({ ...props.appState, error: true, isBusy: false });
        });
    } else {
      console.log(props.appState);
      props.setAppState({ ...props.appState, error: true });
    }
  };

  const onFullNameChanged = (event) => {
    setUserData({ ...userData, fullName: event.target.value });
  };

  const onPhoneNumberChanged = (event) => {
    setUserData({ ...userData, phoneNumber: event.target.value });
  };
  return (
    <div>
      <Dialog
        open={props.appState.newUserModalIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Who are you?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We will save this info so you won't have to fill it again, otherwise
            you may change it in Manage.
          </DialogContentText>
          <TextField
            onChange={onFullNameChanged}
            margin="dense"
            id="fullname"
            label="Full Name"
            type="text"
            fullWidth
          />
          <TextField
            onChange={onPhoneNumberChanged}
            margin="dense"
            id="phonenumber"
            label="Phone Number"
            type="text"
            fullWidth
          />
          <VerticalSpace />
        </DialogContent>
        <DialogActions style={{ padding: 18 }}>
          <Button onClickHandler={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClickHandler={onContinueClicked} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewUserModal;
