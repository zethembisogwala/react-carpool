import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleTabs from "./tabs/tabs";

import * as actionCreators from "../../store/actions/actionCreators";
import OfferRideModal from "../UI/modal/offerRideModal";
import "./manage.css";

const Manage = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    if(props.myTrips === null) {
      console.log('printing', props)
      props.fetchAllMyTrips();
      props.fetchAllUsers();
    }
  }, []);
  return (
    <div className="Manage">
      <SimpleTabs open={modalIsOpen} setOpen={setModalIsOpen} />
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
    fetchAllMyTrips: () => dispatch(actionCreators.fetchAllTripsStart()),
    fetchAllUsers: () => dispatch(actionCreators.fetchAllUsersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Manage));
