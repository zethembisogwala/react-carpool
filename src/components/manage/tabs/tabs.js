import React, { useState } from "react";
import "./tabs.css";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Trip from "../../trips/trip/trip";

const trips = [
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        {trips.map((trip) => (
          <div className="ManageTabs">
            <Trip
              key={trip.id}
              from={trip.from}
              to={trip.to}
              user={trip.user}
              userId={trip.userId}
              isDriving={trip.isDriving}
              date={trip.date}
              setOpen={props.setOpen}
            />
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        No requests to show
      </TabPanel>
      <TabPanel value={value} index={2}>
        No offers to show
      </TabPanel>
    </div>
  );
};
