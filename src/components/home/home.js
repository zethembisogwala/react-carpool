import NewTripModal from "../UI/modal/newTripModal";
import NewUserModal from "../UI/modal/newUserModal";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ErrorModal from "../UI/modal/errorModal";

import Button from "../UI/button/button";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

const Home = (props) => {
  const travelButtonClicked = () => {
    if (!props.appState.currentUserId) {
      props.setAppState({ ...props.appState, newUserModalIsOpen: true });
    } else {
      props.setAppState({ ...props.appState, newTripModalIsOpen: true });
    }
  };

  return (
    <div className="App">
      <Button onClickHandler={travelButtonClicked}>Travel</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/trips")}>Discover</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/manage")}>Manage</Button>
      {props.appState.newUserModalIsOpen && <NewUserModal appState={props.appState} setAppState={props.setAppState} />}
      {props.appState.newTripModalIsOpen && <NewTripModal appState={props.appState} setAppState={props.setAppState} />}
      <ErrorModal appState={props.appState} setAppState={props.setAppState} />
    </div>
  );
};

export default withRouter(Home);
