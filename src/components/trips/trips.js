import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";
import OfferRideModal from "../UI/modal/offerRideModal";
import axios from "axios";

import { objectToList } from "../../helpers/functions";

import "./trips.css";
import RequestRideModal from "../UI/modal/requestRideModal";

const Trips = (props) => {
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [requestModalOpen, setRequesModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    props.setAppState((prevState) => {
      return { ...prevState, isBusy: true };
    });
    axios
      .get("https://janev-2e278.firebaseio.com/trips.json")
      .then((response) => {
        setTrips(objectToList(response.data));
        props.setAppState((prevState) => {
          return { ...prevState, isBusy: false };
        });
      })
      .catch((error) => {
        props.setAppState(prevState => {
            return { ...prevState, error: true }
        });
      });
  }, []);

  const tripList = trips.map((trip) => {
    return (
      <Trip
        key={trip.id}
        trip={trip}
        selectedTrip={selectedTrip}
        setSelectedTrip={setSelectedTrip}
        setOfferModalOpen={setOfferModalOpen}
        setRequestModalOpen={setRequesModalOpen}
        appState={props.appState}
        setAppState={props.setAppState}
      />
    );
  });

  if (trips.length < 1) {
    return <p className="Layout">No trips to display</p>;
  }

  const onSetSelectedTrip = (set) => {
    setSelectedTrip(set);
  };

  return (
    <div className="Trips">
      <VerticalSpace />
      {tripList}
      {selectedTrip && props.appState.isDriving && (
        <OfferRideModal
          setSelectedTrip={onSetSelectedTrip}
          selectedTrip={selectedTrip}
          appState={props.appState}
          setAppState={props.setAppState}
          open={offerModalOpen}
          setOpen={setOfferModalOpen}
        />
      )}
      {selectedTrip && !props.appState.isDriving && (
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

export default React.memo(withRouter(Trips));
