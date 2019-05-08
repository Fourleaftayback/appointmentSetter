import React from "react";

import { NavItem } from "reactstrap";

import ProfileModal from "./ProfileModal";
import Notifications from "./Notifications";

function Profile({ userName }) {
  return (
    <React.Fragment>
      <ProfileModal />
      <NavItem>
        <span className="text-white ml-1" href="/components/">
          <b>{userName}</b>
        </span>
      </NavItem>
      <Notifications />
    </React.Fragment>
  );
}

export default Profile;
