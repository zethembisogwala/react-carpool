import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions/actionCreators";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const snackbar = (props) => {
  const handleClose = (event) => {
    props.setSnackbarIsOpen(false, null);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.snackbarIsOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={props.snackbarData}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbarIsOpen: (open) =>
      dispatch(actionCreators.setSnackbarIsOpen(open, null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(snackbar);
