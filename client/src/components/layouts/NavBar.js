import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import AuthLinks from "../navbar/AuthLinks";
import SignOut from "../navbar/SignOut";

const NavBar = () => {
  const [collapsed, setCollapse] = useState(false);

  const [isLoggedIn] = useState(false);

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
          <NavItem>
            <NavLink className="text-white" href="/components/">
              <i className="fas fa-user-circle fa-2x" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" href="/components/">
              userName
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="navbar-nav mt-2 mt-lg-0">
          {!isLoggedIn ? <AuthLinks /> : <SignOut />}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
