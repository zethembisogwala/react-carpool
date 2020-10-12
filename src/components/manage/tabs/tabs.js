import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tabs.css";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Trip from "../../trips/trip/trip";
import { objectToList } from "../../../helpers/functions";

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

export const SimpleTabs = React.memo((props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [trips, setTrips] = useState([]);

  if (props.appState.currentUserId) {
    useEffect(() => {
      props.setAppState({ ...props.appState, isBusy: true });
      axios
        .get("https://janev-2e278.firebaseio.com/trips.json")
        .then((response) => {
          setTrips(
            objectToList(response.data).filter(
              (trip) => trip.userId === props.appState.currentUserId
            )
          );
          props.setAppState({ ...props.appState, isBusy: false });
        })
        .catch((error) => {
          props.setAppState({ ...props.appState, isBusy: false, error: true });
        });
    }, []);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let availableTrips = trips.map((trip) => (
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

  if (trips.length < 1) {
    availableTrips = <p className="Layout">No trips to display.</p>
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
        No requests to show
      </TabPanel>
      <TabPanel className="Layout" value={value} index={2}>
        No offers to show
      </TabPanel>
    </div>
  );
});
