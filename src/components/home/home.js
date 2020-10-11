import NewTripModal from "../UI/modal/newTripModal";
import NewUserModal from "../UI/modal/newUserModal";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ErrorModal from "../UI/modal/errorModal";

import Button from "../UI/button/button";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

const Home = (props) => {
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newTripModalOpen, setNewTriprModalOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [newUserData, setNewUserData] = useState(false);
  const [newTripData, setNewTripData] = useState(false);

  const setUserData = () => {
    setNewUserData();
  };

  const setTripData = () => {
    setNewTripData();
  };

  const travelButtonClicked = () => {
      const userId = localStorage.getItem('userId');
      if(!userId) {
        setNewUserModalOpen(true);
      }
      else {
          setNewTriprModalOpen(true);
      }
  }

  return (
    <div className="App">
      <Button onClickHandler={travelButtonClicked }>Travel</Button>
      <VerticalSpace />
      <Button onClickHandler={() => props.history.push("/manage")}>
        Manage
      </Button>
      <NewUserModal
        open={newUserModalOpen}
        setOpen={setNewUserModalOpen}
        setUserData={setUserData}
        openNextModal={() => setNewTriprModalOpen(true)}
        setIsBusy={props.setIsBusy}
        setError={setErrorModalIsOpen}
      />
      <NewTripModal
        open={newTripModalOpen}
        setOpen={setNewTriprModalOpen}
        setIsBusy={props.setIsBusy}
        setError={setErrorModalIsOpen}
      />
      <ErrorModal
        show={errorModalIsOpen}
        setOpen={setErrorModalIsOpen}
      />
    </div>
  );
};

export default withRouter(Home);
