import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";

import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";
import OfferRideModal from "../UI/modal/offerRideModal";

import "./trips.css";
import RequestRideModal from "../UI/modal/requestRideModal";

const Trips = (props) => {
  useEffect(() => {
    props.fetchAllTrips();
    props.fetchAllUsers();
  }, []);

  if (props.trips === null || props.trips.length < 1) {
    return <p className="Layout">{!props.isBusy && "No trips to display"}</p>;
  }

  const tripList = props.trips.map((trip) => {
    return <Trip key={trip.id} trip={trip} />;
  });

  return (
    <div className="Trips">
      <VerticalSpace />
      {tripList}
      {props.offerRideModalIsOpen && props.userToOffer && <OfferRideModal />}
      {props.requestRideModalIsOpen && props.userToRequestFrom && <RequestRideModal />}
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
    fetchAllUsers: () => dispatch(actionCreators.fetchAllUsersStart()),
    fetchAllTrips: () => dispatch(actionCreators.fetchAllTripsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trips));
