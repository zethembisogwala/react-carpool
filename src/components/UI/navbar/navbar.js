import React from "react";
import { withRouter } from "react-router-dom";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "./navbar.css";
import { capitalize } from "../../../helpers/functions";

const navbar = (props) => {
  return (
    <div className="NavBar">
      <ArrowBackIcon
        className="NavBarBackButton"
        onClick={() => props.history.goBack()}
      />
      <span className="NavBarHeader">{capitalize(props.location.pathname.substring(1, props.location.pathname.length))}</span>
    </div>
  );
};

export default withRouter(navbar);
