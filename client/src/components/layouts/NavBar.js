import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import AuthLinks from "../navbar/AuthLinks";
import SignOut from "../navbar/SignOut";
import Profile from "../profile/Profile";

const NavBar = ({ isLoggedIn, userName }) => {
  const [collapsed, setCollapse] = useState(false);

  const collapseHandler = () => {
    collapsed ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Navbar color="dark" light expand="md">
      <NavbarBrand className="text-white" href="/">
        Brand
      </NavbarBrand>
      <NavbarToggler onClick={collapseHandler} />

      <Collapse isOpen={collapsed} navbar>
        <Nav className="navbar-nav mr-auto mt-2 mt-lg-0">
          {isLoggedIn ? <Profile userName={userName} /> : null}
        </Nav>
        <Nav className="navbar-nav mt-2 mt-lg-0">
          {!isLoggedIn ? <AuthLinks /> : <SignOut />}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  userName: state.auth.user.first_name
});

export default connect(
  mapStateToProps,
  null
)(NavBar);
