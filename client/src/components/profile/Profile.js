import React from "react";

import { NavItem } from "reactstrap";

import ProfileModal from "./ProfileModal";

function Profile({ userName }) {
  return (
    <React.Fragment>
      <ProfileModal />
      <NavItem>
        <span className="text-white ml-1" href="/components/">
          <b>{userName}</b>
        </span>
      </NavItem>
    </React.Fragment>
  );
}

export default Profile;
