import * as actions from "./actions/actions";
import * as actionCreators from "./actions/actionCreators";

const initialState = {
  error: false,
  isBusy: false,
  currentUserId: localStorage.getItem("userId"),
  isDriving: null,
  newUserModalIsOpen: false,
  newTripModalIsOpen: false,
  errorModalIsOpen: false,
  trips: null,
  myTrips: null,
  users: null,
  snackbarIsOpen: false,
  snackbarData: null,
  selectedTrip: null,
  offerRideModalIsOpen: false,
  requestRideModalIsOpen: false,
  userToRequestFrom: null,
  userToOffer: null,
};

const reducer = (state = initialState, action) => {
  console.log("Reducer reached, ", action);
  switch (action.type) {
    default:
      return state;
    case actions.SET_NEW_USER_MODAL_IS_OPEN:
      return {
        ...state,
        newUserModalIsOpen: action.open,
      };
    case actions.SET_NEW_TRIP_MODAL_IS_OPEN:
      return {
        ...state,
        newTripModalIsOpen: action.open,
      };
    case actions.SET_IS_BUSY:
      return {
        ...state,
        isBusy: action.isBusy,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.POST_NEW_USER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        newTripModalIsOpen: action.navigate,
        currentUserId: action.id,
      };
    case actions.POST_NEW_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.FETCH_ALL_TRIPS_START:
      return {
        ...state,
        isBusy: true,
      };
    case actions.FETCH_ALL_TRIPS_SUCCESS:
      return {
        ...state,
        trips: action.trips,
        isBusy: false,
      };
    case actions.FETCH_ALL_TRIPS_ERROR:
      return {
        ...state,
        error: action.error,
        isBusy: false,
      };
    case actions.FETCH_ALL_USERS_START:
      return {
        ...state,
        isBusy: true,
      };
    case actions.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isBusy: false,
      };
    case actions.POST_NEW_TRIP_SUCCESS:
      return {
        ...state,
        isBusy: false,
      };

    case actions.SET_SNACKBAR_IS_OPEN:
      return {
        ...state,
        snackbarIsOpen: action.snackbarIsOpen,
        snackbarData: action.snackbarData,
      };
    case actions.FETCH_ALL_MY_TRIPS_SUCCESS:
      return {
        ...state,
        myTrips: action.myTrips,
        isBusy: false,
      };

    case actions.SET_SELECTED_TRIP:
      return {
        ...state,
        selectedTrip: action.trip,
      };
    case actions.SET_OFFER_RIDE_MODAL_IS_OPEN:
      return {
        ...state,
        offerRideModalIsOpen: action.open,
      };
    case actions.SET_REQUEST_RIDE_MODAL_IS_OPEN:
      return {
        ...state,
        requestRideModalIsOpen: action.open,
      };

    case actions.SET_USER_TO_OFFER:
      return {
        ...state,
        userToOffer: action.user,
      };
    case actions.SET_USER_TO_REQUEST_FROM:
      return {
        ...state,
        userToRequestFrom: action.user,
      };
  }
};

export default reducer;
