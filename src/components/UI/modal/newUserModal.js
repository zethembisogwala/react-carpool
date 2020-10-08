import React from "react";
import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import VerticalSpace from "../verticalSpace/verticalSpace";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewUserModal = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  const onContinueClicked = () => {
      props.setOpen(false);
      props.setIsBusy(true);
      setTimeout(() => {
        props.setIsBusy(false);
        props.openNextModal();
      }, 1000);
  }

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
            We will save this info so you won't have to fill it again, otherwise you may change it in Manage.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Full Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phonenumber"
            label="Phone Number"
            type="text"
            fullWidth
          />
          <VerticalSpace />
        </DialogContent>
        <DialogActions style={{padding: 18}}>
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
