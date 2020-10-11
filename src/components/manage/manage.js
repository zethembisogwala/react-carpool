import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { SimpleTabs } from './tabs/tabs';

import OfferRideModal from "../UI/modal/offerRideModal";
import "./manage.css";


const Manage = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className='Manage'>
      <SimpleTabs setIsBusy={props.setIsBusy} open={modalIsOpen} setOpen={setModalIsOpen} />
    </div>
  );
};

export default React.memo(withRouter(Manage));
