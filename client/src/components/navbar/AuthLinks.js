import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { loginUser, loginTeam } from "../../actions/authActions";

import LoginModal from "../auth/LoginModal";

const AuthLinks = ({ loginUser, loginTeam }) => {
  return (
    <React.Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav className="text-white">
          Login
        </DropdownToggle>
        <DropdownMenu className="bg-dark" right>
          <DropdownItem>
            <LoginModal
              loginType="User"
              forgotPath="/forgot"
              login={loginUser}
            />
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-white">
            <LoginModal
              loginType="Team"
              forgotPath="/team/forgot"
              login={loginTeam}
            />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <NavItem>
        <NavLink className="text-white" href="/signup">
          Sign Up
        </NavLink>
      </NavItem>
    </React.Fragment>
  );
};

AuthLinks.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginTeam: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loginUser: loginUser,
  loginTeam: loginTeam
};

export default connect(
  null,
  mapDispatchToProps
)(AuthLinks);
