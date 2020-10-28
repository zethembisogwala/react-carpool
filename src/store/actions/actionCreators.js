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
  return (dispatch) => {
    dispatch(setIsBusy(false));
    return {
      type: actions.SET_ERROR,
      error: error,
    };
  };
};

export const postNewUserStart = (userData, path) => {
  console.log(path, "is the path");
  return (dispatch) => {
    dispatch(setNewUserModalIsOpen(false));
    dispatch(setIsBusy(true));
    axios
      .post("https://janev-2e278.firebaseio.com/users.json", userData)
      .then((response) => {
        dispatch(postNewUserSuccess(response.data, path));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const postNewUserSuccess = (successInfo, path) => {
  localStorage.setItem("userId", successInfo.name);
  return {
    type: actions.POST_NEW_USER_SUCCESS,
    id: successInfo.name,
    navigate: path !== "trips",
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
    dispatch(setSnackbarIsOpen(true, "New trip posted successfully!"));
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

export const fetchAllTripsStart = (id = null) => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
    axios
      .get("https://janev-2e278.firebaseio.com/trips.json")
      .then((response) => {
        if (id === null) {
          dispatch(fetchAllTripsSuccess(objectToList(response.data)));
        } else {
          dispatch(fetchAllMyTripsSuccess(objectToList(response.data)));
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

export const fetchAllMyTripsSuccess = (trips) => {
  const currUserId = localStorage.getItem("userId");
  const myTrips = trips.filter((trip) => trip.userId === currUserId);

  return {
    type: actions.FETCH_ALL_MY_TRIPS_SUCCESS,
    myTrips: myTrips,
  };
};

export const fetchAllUsersStart = () => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
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

export const setSnackbarIsOpen = (open, snackbarData) => {
  return {
    type: actions.SET_SNACKBAR_IS_OPEN,
    snackbarIsOpen: open,
    snackbarData: snackbarData,
  };
};

export const setSelectedTrip = (trip) => {
  return {
    type: actions.SET_SELECTED_TRIP,
    trip: trip,
  };
};

export const setOfferRideModalIsOpen = (open) => {
  return {
    type: actions.SET_OFFER_RIDE_MODAL_IS_OPEN,
    open: open,
  };
};

export const setRequestRideModalIsOpen = (open) => {
  return {
    type: actions.SET_REQUEST_RIDE_MODAL_IS_OPEN,
    open: open,
  };
};

export const fetchTripById = (id, callback) => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
    axios
      .get(`https://janev-2e278.firebaseio.com/trips/${id}.json`)
      .then((response) => {
        dispatch(callback(response.data));
        dispatch(setIsBusy(false));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const fetchUserById = (id, callback) => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
    axios
      .get(`https://janev-2e278.firebaseio.com/users/${id}.json`)
      .then((response) => {
        dispatch(callback(response.data));
        dispatch(setIsBusy(false));
      })
      .catch();
  };
};

export const setUserToOffer = (user) => {
  console.log("abtraction called");
  return {
    type: actions.SET_USER_TO_OFFER,
    user: user,
  };
};

export const setUserToRequestFrom = (user) => {
  console.log("abtraction called");
  return {
    type: actions.SET_USER_TO_REQUEST_FROM,
    user: user,
  };
};


export const postRideOfferStart = (rideOffer) => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
    axios
      .post("https://janev-2e278.firebaseio.com/rideOffers.json", rideOffer)
      .then((response) => {
        dispatch(postRideOfferSuccess(response.data));
        dispatch(setSnackbarIsOpen(true, "Ride offer sent!"));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const postRideOfferSuccess = (successInfo) => {
  return {
    type: actions.POST_RIDE_OFFER_SUCCESS,
    id: successInfo.name,
  };
};


export const postRideRequestStart = (rideRequest) => {
  return (dispatch) => {
    dispatch(setIsBusy(true));
    axios
      .post("https://janev-2e278.firebaseio.com/rideRequests.json", rideRequest)
      .then((response) => {
        dispatch(postRideRequestSuccess(response.data));
        dispatch(setSnackbarIsOpen(true, "Ride request sent!"));
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
