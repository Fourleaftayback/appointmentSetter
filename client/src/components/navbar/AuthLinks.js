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

import {
  userLoginModalToggle,
  teamLoginModalToggle
} from "../../actions/viewsActions";

import LoginModal from "../auth/LoginModal";

const AuthLinks = ({
  loginUser,
  loginTeam,
  userLoginModalToggle,
  userLoginIsOpen,
  teamLoginModalToggle,
  teamLoginIsOpen
}) => {
  return (
    <React.Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav className="cus-text-light font-weight-bold">
          Login
        </DropdownToggle>
        <DropdownMenu className="cus-bg-secondary" right>
          <DropdownItem className="py-0">
            <LoginModal
              loginType="User"
              forgotPath="/forgot"
              login={loginUser}
              modalToggle={userLoginModalToggle}
              modalIsOpen={userLoginIsOpen}
            />
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-white">
            <LoginModal
              loginType="Team"
              forgotPath="/team/forgot"
              login={loginTeam}
              modalToggle={teamLoginModalToggle}
              modalIsOpen={teamLoginIsOpen}
            />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <NavItem>
        <NavLink className="cus-text-light font-weight-bold" href="/signup">
          Sign Up
        </NavLink>
      </NavItem>
    </React.Fragment>
  );
};

AuthLinks.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginTeam: PropTypes.func.isRequired,
  userLoginModalToggle: PropTypes.func.isRequired,
  teamLoginModalToggle: PropTypes.func.isRequired,
  userLoginIsOpen: PropTypes.bool.isRequired,
  teamLoginIsOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userLoginIsOpen: state.views.userLoginIsOpen,
  teamLoginIsOpen: state.views.teamLoginIsOpen
});

const mapDispatchToProps = {
  loginUser: loginUser,
  loginTeam: loginTeam,
  userLoginModalToggle: userLoginModalToggle,
  teamLoginModalToggle: teamLoginModalToggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLinks);
