import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NavItem, Badge, Button, NavLink } from "reactstrap";

import { getUserApps } from "../../actions/clientAppActions";

const Notifications = ({ getUserApps, appCount, userData }) => {
  const [link] = useState("/myappointments");
  useEffect(() => {
    if (!userData.hasOwnProperty("isAdmin")) {
      getUserApps();
    }
  }, []);

  return (
    <React.Fragment>
      <NavItem>
        <NavLink href={link}>
          <Button color="light" outline size="sm">
            Appointments <Badge color="warning">{appCount}</Badge>
          </Button>
        </NavLink>
      </NavItem>
    </React.Fragment>
  );
};

Notifications.propTypes = {
  getUserApps: PropTypes.func.isRequired,
  appCount: PropTypes.number.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userData: state.auth.user,
  appCount: state.clientAppointment.userOnlySched.length
});

export default connect(
  mapStateToProps,
  { getUserApps }
)(Notifications);
