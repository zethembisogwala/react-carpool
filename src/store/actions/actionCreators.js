import * as actions from "./actions";
import axios from "axios";

import { objectToList } from "../../helpers/functions";

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
  return {
    type: actions.SET_ERROR,
    error: error,
  };
};

export const postNewUserStart = (userData) => {
  return (dispatch) => {
    dispatch(setNewUserModalIsOpen(false));
    dispatch(setIsBusy(true));
    axios
      .post("https://janev-2e278.firebaseio.com/users.json", userData)
      .then((response) => {
        dispatch(postNewUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const postNewUserSuccess = (successInfo) => {
  localStorage.setItem("userId", successInfo.name);
  return {
    type: actions.POST_NEW_USER_SUCCESS,
    id: successInfo.name,
  };
};

export const postNewTripStart = (tripData) => {
  return (dispatch) => {
    dispatch(setNewTripModalIsOpen(false));
    dispatch(setIsBusy(true));
    axios
      .post("https://janev-2e278.firebaseio.com/trips.json", tripData)
      .then((response) => {
        dispatch(postNewTripSuccess(response.data));
      })
      .catch((error) => {
        dispatch(postNewTripError(error));
      });
  };
};

export const postNewTripSuccess = (successInfo) => {
  return (dispatch) => {
    dispatch(setSnackbarIsOpen(true, 'New trip posted successfully!'));
    dispatch(fetchAllTripsStart());
    return {
      type: actions.POST_NEW_TRIP_SUCCESS,
      id: successInfo.name,
    };
  };
};

export const postNewTripError = (error) => {
  return {
    type: actions.SET_ERROR,
    error: error,
  };
};

export const fetchAllTripsStart = () => {
  return (dispatch) => {
    axios
      .get("https://janev-2e278.firebaseio.com/trips.json")
      .then((response) => {
        if (response.data !== null) {
          dispatch(fetchAllTripsSuccess(objectToList(response.data)));
        } else {
          dispatch(fetchAllTripsSuccess([]));
        }
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const fetchAllTripsSuccess = (trips) => {
  return {
    type: actions.FETCH_ALL_TRIPS_SUCCESS,
    trips: trips,
  };
};

export const fetchAllUsersStart = () => {
  return (dispatch) => {
    axios
      .get("https://janev-2e278.firebaseio.com/users.json")
      .then((response) => {
        dispatch(fetchAllUsersSuccess(objectToList(response.data)));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const fetchAllUsersSuccess = (users) => {
  return {
    type: actions.FETCH_ALL_USERS_SUCCESS,
    users: users,
  };
};

export const postRideRequestStart = (rideRequestData) => {
  return (dispatch) => {
    axios
      .post(
        "https://janev-2e278.firebaseio.com/rideRequests.json",
        rideRequestData
      )
      .then((response) => {
        dispatch(postRideRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const postRideRequestSuccess = (successInfo) => {
  return {
    type: actions.POST_RIDE_REQUEST_SUCCESS,
    id: successInfo.name,
  };
};

export const setSnackbarIsOpen = (open, snackbarData) => {
  return {
    type: actions.SET_SNACKBAR_IS_OPEN,
    snackbarIsOpen: open,
    snackbarData: snackbarData,
  };
};
