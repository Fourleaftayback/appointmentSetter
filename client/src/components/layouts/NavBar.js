import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import LoginModal from "../auth/LoginModal";

const NavBar = () => {
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
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav className="text-white">
              Login
            </DropdownToggle>
            <DropdownMenu className="bg-dark" right>
              <DropdownItem>
                <LoginModal loginType="User" forgotPath="/forgot" />
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="text-white">
                <LoginModal loginType="Team" forgotPath="/team/forgot" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink className="text-white" href="/signup">
              Sign Up
            </NavLink>
          </NavItem>
          {/* 
          <NavItem>
            <NavLink className="text-white" href="/signout">
              Sign Out
            </NavLink>
          </NavItem>
          */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
