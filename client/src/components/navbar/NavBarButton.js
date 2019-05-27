import React from "react";
import PropTypes from "prop-types";

import { NavItem, Button } from "reactstrap";

const NavBarButton = ({ onClick, body }) => {
  return (
    <React.Fragment>
      <NavItem className="cus-m-auto">
        <Button
          outline
          size="sm"
          className="cus-text-light cus-btn-transparent nav-btn"
          onClick={onClick}>
          {body}
        </Button>
      </NavItem>
    </React.Fragment>
  );
};

NavBarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired
};

export default NavBarButton;
