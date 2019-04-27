import React from "react";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import LoginModal from "../auth/LoginModal";

const AuthLinks = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AuthLinks;
