import * as actions from "./actions";

export const setNewUserModalIsOpen = (open) => {
  return {
    type: actions.SET_NEW_USER_MODAL_IS_OPEN,
    open: open,
  };
};

export const setNewTripModalIsOpen = (open) => {
  return {
    type: actions.SET_NEW_TRIP_MODAL_IS_OPEN,
    open: open,
  };
};

export const setIsBusy = (isBusy) => {
  return {
    type: actions.SET_IS_BUSY,
    isBusy: isBusy,
  };
};

export const setError = (error) => {
  return (dispatch) => {
    dispatch(setIsBusy(false));
    return {
      type: actions.SET_ERROR,
      error: error,
    };
  };
};

export const setSnackbarIsOpen = (open, snackbarData) => {
  return {
    type: actions.SET_SNACKBAR_IS_OPEN,
    snackbarIsOpen: open,
    snackbarData: snackbarData,
  };
};
