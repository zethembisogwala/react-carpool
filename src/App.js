import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NewTripModal from "./components/UI/modal/newTripModal";
import NewUserModal from "./components/UI/modal/newUserModal";

import ErrorModal from "./components/UI/modal/errorModal";

import Home from "./components/home/home";
import Manage from "./components/manage/manage";
import NavBar from "./components/UI/navbar/navbar";
import Trips from "./components/trips/trips";
import "./App.css";
import Spinner from "./components/UI/spinner/spinner";
import Snackbar from "./components/UI/snackbar/snackbar";

const App = (props) => {
  let navbar = <NavBar />;

  if (props.history.location.pathname === "/") {
    navbar = null;
  }

  return (
    <React.Fragment>
      {navbar}
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/manage" render={() => <Manage />} />
      <Route exact path="/trips" render={() => <Trips />} />
      <Spinner />
      {props.newUserModalIsOpen && <NewUserModal />}
      {props.newTripModalIsOpen && <NewTripModal />}
      {props.error && <ErrorModal />}
      {props.snackbarIsOpen && <Snackbar />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(withRouter(App));
