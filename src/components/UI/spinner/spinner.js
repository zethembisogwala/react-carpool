import React from "react";
import "./spinner.css";
import { connect } from 'react-redux';

const Spinner = (props) => {
  let style = null;
  if (props.isBusy) {
    style = { display: "block" };
  }
  return <div style={style} id="cover-spin"></div>;
};

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Spinner);
