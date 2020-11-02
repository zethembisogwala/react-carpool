import React, { useState } from "react";
import { connect } from "react-redux";
import "./tabs.css";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Trip from "../../trips/trip/trip";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
}));

export const SimpleTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let availableTrips = <i className="Layout">No trips to display.</i>;
  console.log(props.trips);
  if (props.trips !== null) {
    availableTrips = props.trips
      .filter((item) => item.userId === props.currentUserId)
      .map((trip) => (
        <div className="ManageTabs">
          <Trip
            key={trip.id}
            trip={trip}
            setOpen={props.setOpen}
            setAppState={props.setAppState}
            appState={props.appState}
          />
        </div>
      ));
  }

  let myRideRequests = <i>You have not made any ride requests yet.</i>;
  let myRideOffers = <i>You have not made any ride offers yet.</i>;

  if (props.rideRequests !== null) {
    myRideRequests = props.rideRequests
      .filter((rideRequest) => rideRequest.requestorId === props.currentUserId)
      .map((myRideRequest) => (
        <div>
          <p>{myRideRequest.id} HHHHH</p>
        </div>
      ));
  }

  if (props.rideOffers !== null) {
    myRideOffers = props.rideOffers
      .filter((rideOffer) => rideOffer.offerorId === props.currentUserId)
      .map((myRideOffer) => (
        <div className="ManageTabs">
          <p>{myRideOffer.id}</p>
        </div>
      ));
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "grey",
          color: "black",
          alignItems: "center",
        }}
        className="Bar"
      >
        <Tabs
          TabIndicatorProps={{ style: { background: "black" } }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Trips" {...a11yProps(0)} />
          <Tab label="Requests" {...a11yProps(1)} />
          <Tab label="Offers" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {availableTrips}
      </TabPanel>
      <TabPanel className="Layout" value={value} index={1}>
        {myRideRequests}
      </TabPanel>
      <TabPanel className="Layout" value={value} index={2}>
        {myRideOffers}
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs);
