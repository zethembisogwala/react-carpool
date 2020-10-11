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
    props.setOpen(false);
  };

  const onContinueClicked = () => {
    props.setOpen(false);
    props.setIsBusy(true);
    if (userData.fullName.length > 0 && userData.phoneNumber.length > 0) {
      axios
        .post("https://janev-2e278.firebaseio.com/users.json", userData)
        .then((response) => {
          localStorage.setItem("userId", response.data.name);
          props.setIsBusy(false);
          props.openNextModal();
        })
        .catch((error) => {
          props.setIsBusy(false);
          props.setError(true);
        });
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
        open={props.open}
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
            autoFocus
            margin="dense"
            id="fullname"
            label="Full Name"
            type="text"
            fullWidth
          />
          <TextField
            onChange={onPhoneNumberChanged}
            autoFocus
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
