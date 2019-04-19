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

const NavBar = () => {
  const [name] = useState(null);
  return (
    <Navbar color="dark">
      <NavbarBrand href="/" className="text-warning pl-4">
        Appointment Setter {"  "} <span className="text-warning">{name}</span>
      </NavbarBrand>
      <NavbarToggler className="mr-2" />
      <Collapse isOpen={false} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/test">some link here</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
