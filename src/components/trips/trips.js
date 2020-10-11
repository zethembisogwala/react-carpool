import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";
import OfferRideModal from "../UI/modal/offerRideModal";
import axios from "axios";

import { objectToList } from "../../helpers/functions";

import "./trips.css";

const Trips = (props) => {
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    props.setIsBusy(true);
    axios
      .get("https://janev-2e278.firebaseio.com/trips.json")
      .then((response) => {
        setTrips(objectToList(response.data));
        props.setIsBusy(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const tripList = trips.map((trip) => {
    return (
      <Trip
        key={trip.id}
        trip={trip}
        selectedTrip={selectedTrip}
        setSelectedTrip={setSelectedTrip}
        setOfferModalOpen={setOfferModalOpen}
        setIsBusy={props.setIsBusy}
      />
    );
  });

  if (trips.length < 1) {
    return <p className="Layout">No trips to display</p>;
  }

  const onSetSelectedTrip = (set) => {
      setSelectedTrip(set);
  }

  return (
    <div className="Trips">
      <VerticalSpace />
      {tripList}
      {selectedTrip && (
        <OfferRideModal
          setSelectedTrip={onSetSelectedTrip}
          selectedTrip={selectedTrip}
          isBusy={props.isBusy}
          setIsBusy={props.setIsBusy}
          open={offerModalOpen}
          setOpen={setOfferModalOpen}
        />
      )}
    </div>
  );
};

export default React.memo(withRouter(Trips));
