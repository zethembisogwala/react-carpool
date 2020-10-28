import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actionCreators";

import "./trip.css";
import AirportShuttleRoundedIcon from "@material-ui/icons/AirportShuttleRounded";
import DirectionsWalkRoundedIcon from "@material-ui/icons/DirectionsWalkRounded";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "../../UI/button/button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Trip = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  if (!props.users) {
    return <div></div>;
  }

  let fullName = "";
  if (props.users !== null && props.users.length > 0) {
    const user = props.users.find((user) => user.id === props.trip.userId);
    fullName = user.fullName;
  }
  const offerRide = () => {
    props.setSelectedTrip(props.trip);
    if (props.currentUserId) {
      if (!props.userToOffer || props.trip.userId !== props.userToOffer.id) {
        props.fetchUserToOffer(props.trip.userId);
      }
      props.setOfferRideModalIsOpen(true);
    } else {
      props.setNewUserModalIsOpen(true);
    }
  };

  const requestRide = () => {
    props.setSelectedTrip(props.trip);
    if (props.currentUserId) {
      if (
        !props.userToRequestFrom ||
        props.trip.userId !== props.userToRequestFrom.id
      ) {
        props.fetchUserToRequestFrom(props.trip.userId);
      }
      props.setRequestRideModalIsOpen(true);
    } else {
      props.setNewUserModalIsOpen(true);
    }
  };

  const offerRideButton = (
    <Button onClickHandler={offerRide} size="small">
      Offer ride
    </Button>
  );

  const requestRideButton = (
    <Button onClickHandler={requestRide} size="small">
      Request ride
    </Button>
  );

  const icon = props.trip.isDriver ? (
    <AirportShuttleRoundedIcon fontSize="small" />
  ) : (
    <DirectionsWalkRoundedIcon fontSize="small" />
  );

  return (
    <Card className={[classes.root, "Trip"].join(" ")}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {fullName}
        </Typography>
        <Typography id="title" variant="h5" component="h2">
          {props.trip.from} {bull} {icon} {bull} {props.trip.to}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.trip.date}
        </Typography>
      </CardContent>
      {props.location.pathname === "/trips" && (
        <CardActions className="CardActions">
          {props.trip.isDriver ? requestRideButton : offerRideButton}
        </CardActions>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOfferRideModalIsOpen: (open) =>
      dispatch(actionCreators.setOfferRideModalIsOpen(open)),
    setRequestRideModalIsOpen: (open) =>
      dispatch(actionCreators.setRequestRideModalIsOpen(open)),
    setNewUserModalIsOpen: (open) =>
      dispatch(actionCreators.setNewUserModalIsOpen(open)),
    setSelectedTrip: (trip) => dispatch(actionCreators.setSelectedTrip(trip)),
    fetchUserToOffer: (id) =>
      dispatch(actionCreators.fetchUserById(id, actionCreators.setUserToOffer)),
    fetchUserToRequestFrom: (id) =>
      dispatch(
        actionCreators.fetchUserById(id, actionCreators.setUserToRequestFrom)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip));
