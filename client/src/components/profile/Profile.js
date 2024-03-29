import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { NavItem } from "reactstrap";

import ProfileModal from "./ProfileModal";

const Notifications = React.lazy(() => import("./Notifications"));

function Profile({ userName, isTeam }) {
  return (
    <React.Fragment>
      <ProfileModal />
      <NavItem className="m-auto">
        <span className="cus-text-light nav-name" href="/components/">
          <b>{userName}</b>
        </span>
      </NavItem>
      {!isTeam ? (
        <Suspense fallback={<li>Error</li>}>
          <Notifications />
        </Suspense>
      ) : null}
    </React.Fragment>
  );
}

Profile.propTypes = {
  isTeam: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
};

export default Profile;
