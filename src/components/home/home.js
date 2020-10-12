
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Button from "../UI/button/button";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

const Home = (props) => {
  const travelButtonClicked = () => {
    if (!props.appState.currentUserId) {
      props.setAppState(prevState => {
          return { ...prevState, newUserModalIsOpen: true }
      });
    } else {
      props.setAppState(prevState => {
          return { prevState, newTripModalIsOpen: true }
      });
    }
  };

  return (
    <div className="App">
      <Button onClickHandler={travelButtonClicked}>Travel</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/trips")}>Discover</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/manage")}>Manage</Button>
    </div>
  );
};

export default withRouter(Home);
