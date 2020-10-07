import NewTripModal from "../UI/modal/newTripModal";
import NewUserModal from "../UI/modal/newUserModal";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Button from "../UI/button/button";
import VerticalSpace from "../UI/verticalSpace/verticalSpace";

const Home = (props) => {
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newTripModalOpen, setNewTriprModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState(false);
  const [newTripData, setNewTripData] = useState(false);

  const setUserData = () => {
    setNewUserData();
  };

  const setTripData = () => {
      setNewTripData();
  }

  return (
    <div className="App">
      <Button onClickHandler={() => setNewUserModalOpen(true)}>Travel</Button>
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
      />
      <NewTripModal open={newTripModalOpen} setOpen={setNewTriprModalOpen} setIsBusy={props.setIsBusy} />
    </div>
  );
};

export default withRouter(Home);
