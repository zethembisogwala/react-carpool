import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";
import OfferRideModal from "../UI/modal/offerRideModal";

import './trips.css';

const availableTrips = [
  {
    id: 1,
    from: "Ulundi",
    to: "Durban",
    user: {
      id: 1,
      name: "Alexandre Pato",
    },
    userId: 1,
    isDriving: true,
    date: "08/10/2020",
  },
  {
    id: 2,
    from: "Ulundi",
    to: "Empangeni",
    user: {
      id: 2,
      name: "Xavi Hernandez",
    },
    userId: 2,
    isDriving: false,
    date: "08/10/2020",
  },
  {
    id: 3,
    from: "Durban",
    to: "Pietermaritzburg",
    user: {
      id: 3,
      name: "Emmanuel Adebayor",
    },
    userId: 3,
    isDriving: true,
    date: "08/10/2020",
  },
];

const Trips = (props) => {
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const tripList = availableTrips.map((item, index) => {
    return (
      <Trip
        key={item.id}
        from={item.from}
        to={item.to}
        user={item.user}
        userId={item.userId}
        isDriving={item.isDriving}
        date={item.date}
        setOpen={setOfferModalOpen}
      />
    );
  });

  return (
    <div className='Trips'>
      <VerticalSpace />
      {tripList}
      <OfferRideModal isBusy={props.isBusy} setIsBusy={props.setIsBusy} open={offerModalOpen} setOpen={setOfferModalOpen} />
    </div>
  );
};

export default withRouter(Trips);
