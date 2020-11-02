import * as actions from "./actions";

const initialState = {
  error: false,
  isBusy: false,
  newUserModalIsOpen: false,
  newTripModalIsOpen: false,
  snackbarData: null,
};

const reducer = (state = initialState, action) => {
  console.log("app reducer reached, ", action, state, "state");
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
  }
};

export default reducer;
