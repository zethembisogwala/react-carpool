import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actionCreators";

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
    props.setNewUserModalIsOpen(false);
  };

  const onContinueClicked = () => {
    if (userData.fullName.length > 0 && userData.phoneNumber.length > 0) {
      const path = props.location.pathname.substring(1, props.location.pathname.length);
      props.postNewUser(userData, path);
    } else {
      console.log(props.appState);
      props.setError("Invalid full name or phone number");
    }
  };

  const onFullNameChanged = (e) => {
    const fullName = e.target.value.trim();
    setUserData((prevUserData) => {
      return { ...prevUserData, fullName: fullName };
    });
  };

  const onPhoneNumberChanged = (e) => {
    const phoneNumber = e.target.value.trim();
    setUserData((prevUserData) => {
      return { ...prevUserData, phoneNumber: phoneNumber };
    });
  };
  return (
    <div>
      <Dialog
        open={props.newUserModalIsOpen}
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

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewUserModalIsOpen: (open) =>
      dispatch(actionCreators.setNewUserModalIsOpen(open)),
    postNewUser: (userData, path) =>
      dispatch(actionCreators.postNewUserStart(userData, path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewUserModal));
