import React from "react";
import Button from "../button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorModal = (props) => {
  const handleClose = () => {
    props.setAppState({ ...props.appState, error: false });
  };

  const onOKClicked = () => {
    props.setAppState({ ...props.appState, error: false });
  };

  return (
    <div>
      <Dialog
        open={props.appState.error}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`An error occurred`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Something went wrong, try again later.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: 18 }}>
          <Button onClickHandler={onOKClicked} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;
