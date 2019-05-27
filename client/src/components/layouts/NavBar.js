import React, { Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../history/History";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import AuthLinks from "../navbar/AuthLinks";
import Profile from "../profile/Profile";

import { logOutUser } from "../../actions/authActions";
import { navBarToggle } from "../../actions/viewsActions";

const NavBarButton = React.lazy(() => import("../navbar/NavBarButton"));

const NavBar = ({
  isLoggedIn,
  userName,
  isTeam,
  logOutUser,
  navBarToggle,
  navBarIsOpen
}) => {
  const collapseHandler = () => {
    navBarToggle();
  };

  return (
    <Navbar color="transparent" dark expand="md">
      <NavbarBrand className="cus-text-light mx-2" href="/">
        <i className="fas fa-cut fa-lg" />
        <span className="ml-2">Scheduler</span>
      </NavbarBrand>
      <NavbarToggler onClick={collapseHandler} />

      <Collapse isOpen={navBarIsOpen} navbar>
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
  logOutUser: PropTypes.func.isRequired,
  navBarToggle: PropTypes.func.isRequired,
  navBarIsOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  userName: state.auth.user.first_name,
  isTeam: state.auth.user.hasOwnProperty("isAdmin"),
  navBarIsOpen: state.views.navBarIsOpen
});

const mapDispatchToProps = {
  logOutUser: logOutUser,
  navBarToggle: navBarToggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
