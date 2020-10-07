import React from "react";
import { withRouter } from "react-router-dom";
import Trip from "./trip/trip";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

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
      />
    );
  });

  return (
    <React.Fragment>
    <VerticalSpace />
        {tripList}
    </React.Fragment>
  );
};

export default withRouter(Trips);
