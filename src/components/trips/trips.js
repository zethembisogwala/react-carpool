import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from '../../store/actions/actionCreators';

import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";
import OfferRideModal from "../UI/modal/offerRideModal";

import "./trips.css";
import RequestRideModal from "../UI/modal/requestRideModal";

const Trips = (props) => {
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [requestModalOpen, setRequesModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    props.fetchAllTrips();
    props.fetchAllUsers();
  }, []);

  if (props.trips === null || props.trips.length < 1) {
    return <p className="Layout">No trips to display</p>;
  }

  const tripList = props.trips.map((trip) => {
    return (
      <Trip
        key={trip.id}
        trip={trip}
        selectedTrip={selectedTrip}
        setSelectedTrip={setSelectedTrip}
        setOfferModalOpen={setOfferModalOpen}
        setRequestModalOpen={setRequesModalOpen}
      />
    );
  });

  const onSetSelectedTrip = (set) => {
    setSelectedTrip(set);
  };
  console.log(props.snackbarData)

  return (
    <div className="Trips">
      <VerticalSpace />
      {tripList}
      {selectedTrip && props.isDriving && (
        <OfferRideModal
          setSelectedTrip={onSetSelectedTrip}
          selectedTrip={selectedTrip}
          open={offerModalOpen}
          setOpen={setOfferModalOpen}
        />
      )}
      {selectedTrip && !props.isDriving && (
        <RequestRideModal
          setSelectedTrip={onSetSelectedTrip}
          selectedTrip={selectedTrip}
          appState={props.appState}
          setAppState={props.setAppState}
          open={requestModalOpen}
          setOpen={setRequesModalOpen}
        />
      )}
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
