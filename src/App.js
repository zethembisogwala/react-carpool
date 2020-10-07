import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import Home from "./components/home/home";
import Manage from "./components/manage/manage";
import NavBar from './components/UI/navbar/navbar';
import Trips from './components/trips/trips';
import "./App.css";
import Spinner from "./components/UI/spinner/spinner";

const App = (props) => {
  const [isBusy, setIsBusy] = useState(false);

  let navbar = <NavBar />;

  if(props.history.location.pathname === '/') {
    navbar = null;
  }
  
  return (
    <React.Fragment>
      { navbar }
      <Route exact path="/" render={() => <Home isBusy={isBusy} setIsBusy={setIsBusy} />} />
      <Route exact path="/manage" render={() => <Manage isBusy={isBusy} setIsBusy={setIsBusy} />} />
      <Route exact path="/trips" render={() => <Trips isBusy={isBusy} setIsBusy={setIsBusy} />} />
      <Spinner isBusy={isBusy}/>
    </React.Fragment>
  );
};

export default withRouter(App);
