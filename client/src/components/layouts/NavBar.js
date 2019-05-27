import React, { useState, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../history/History";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import AuthLinks from "../navbar/AuthLinks";
import Profile from "../profile/Profile";

import { logOutUser } from "../../actions/authActions";

const NavBarButton = React.lazy(() => import("../navbar/NavBarButton"));

const NavBar = ({ isLoggedIn, userName, isTeam, logOutUser }) => {
  const [collapsed, setCollapse] = useState(false);

  const collapseHandler = () => {
    collapsed ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Navbar color="transparent" dark expand="md">
      <NavbarBrand className="cus-text-light mx-2" href="/">
        <i className="fas fa-cut fa-lg" />
        <span className="ml-2">Scheduler</span>
      </NavbarBrand>
      <NavbarToggler onClick={collapseHandler} />

      <Collapse isOpen={collapsed} navbar>
        <Nav className="navbar-nav mr-auto mt-lg-0">
          {isLoggedIn ? <Profile userName={userName} isTeam={isTeam} /> : null}
        </Nav>
        <Nav className="navbar-nav mt-2 mt-lg-0">
          {isLoggedIn ? (
            <Suspense fallback={<li>Error</li>}>
              {isTeam ? (
                <NavBarButton
                  body="  Manage   "
                  onClick={() => history.push("/team")}
                />
              ) : null}
              <NavBarButton body="Sign Out" onClick={logOutUser} />
            </Suspense>
          ) : (
            <AuthLinks />
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  isTeam: PropTypes.bool.isRequired,
  logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  userName: state.auth.user.first_name,
  isTeam: state.auth.user.hasOwnProperty("isAdmin")
});

const mapDispatchToProps = {
  logOutUser: logOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
