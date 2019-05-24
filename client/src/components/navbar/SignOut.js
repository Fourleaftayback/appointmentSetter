import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { NavItem, Button } from "reactstrap";

import { logOutUser } from "../../actions/authActions";

const SignOut = ({ logOutUser }) => {
  return (
    <React.Fragment>
      <NavItem className="cus-m-auto">
        <Button
          outline
          size="sm"
          className="cus-text-light cus-btn-transparent"
          onClick={logOutUser}>
          Sign Out
        </Button>
      </NavItem>
    </React.Fragment>
  );
};

SignOut.propTypes = {
  logOutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logOutUser: logOutUser
};

export default connect(
  null,
  mapDispatchToProps
)(SignOut);
