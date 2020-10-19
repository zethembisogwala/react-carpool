import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from '../../store/actions/actionCreators';

import Button from "../UI/button/button";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

const Home = (props) => {
  const travelButtonClicked = () => {
    console.log(props)
    if(props.currentUserId) {
      props.openNewTripModal();
    }
    else {
      props.openNewUserModal();
    }
  };

  return (
    <div className="App">
      <Button onClickHandler={travelButtonClicked}>Travel</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/trips")}>
        Discover
      </Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/manage")}>
        Manage
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNewUserModal: () => dispatch(actionCreators.setNewUserModalIsOpen(true)),
    openNewTripModal: () => dispatch(actionCreators.setNewTripModalIsOpen(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
