import React from "react";
import "./spinner.css";

const Spinner = (props) => {
  let style = null;
  if (props.isBusy) {
    style = { display: "block" };
  }
  return <div style={style} id="cover-spin"></div>;
};

export default Spinner;
