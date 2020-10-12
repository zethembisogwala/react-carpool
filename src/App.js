import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import NewTripModal from "./components/UI/modal/newTripModal";
import NewUserModal from "./components/UI/modal/newUserModal";

import ErrorModal from "./components/UI/modal/errorModal";

import Home from "./components/home/home";
import Manage from "./components/manage/manage";
import NavBar from "./components/UI/navbar/navbar";
import Trips from "./components/trips/trips";
import "./App.css";
import Spinner from "./components/UI/spinner/spinner";

const App = (props) => {
  const [isBusy, setIsBusy] = useState(false);
  const [appState, setAppState] = useState({
    error: false,
    isBusy: false,
    currentUserId: localStorage.getItem("userId"),
    isDriving: null,
    newUserModalIsOpen: false,
    newTripModalIsOpen: false,
    errorModalIsOpen: false,
  });

  let navbar = <NavBar />;

  if (props.history.location.pathname === "/") {
    navbar = null;
  }

  return (
    <React.Fragment>
      {navbar}
      <Route
        exact
        path="/"
        render={() => <Home appState={appState} setAppState={setAppState} />}
      />
      <Route
        exact
        path="/manage"
        render={() => <Manage appState={appState} setAppState={setAppState} />}
      />
      <Route
        exact
        path="/trips"
        render={() => <Trips appState={appState} setAppState={setAppState} />}
      />
      <Spinner isBusy={appState.isBusy} />
      {appState.newUserModalIsOpen && (
        <NewUserModal appState={appState} setAppState={setAppState} />
      )}
      {appState.newTripModalIsOpen && (
        <NewTripModal appState={appState} setAppState={setAppState} />
      )}
      <ErrorModal appState={appState} setAppState={setAppState} />
    </React.Fragment>
  );
};

export default withRouter(App);
