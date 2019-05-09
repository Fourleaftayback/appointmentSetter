import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NavItem, Badge, Button, NavLink } from "reactstrap";

import { getUserApps } from "../../actions/clientAppActions";

const Notifications = ({ getUserApps, appCount }) => {
  useEffect(() => {
    getUserApps();
  }, []);

  return (
    <React.Fragment>
      <NavItem>
        <NavLink href="/myappointments">
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
  appCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  appCount: state.clientAppointment.userOnlySched.length
});

export default connect(
  mapStateToProps,
  { getUserApps }
)(Notifications);
