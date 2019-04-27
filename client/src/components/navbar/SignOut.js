import React from "react";

import { NavItem, NavLink } from "reactstrap";

const SignOut = () => {
  return (
    <React.Fragment>
      <NavItem>
        <NavLink className="text-white" href="/signout">
          Sign Out
        </NavLink>
      </NavItem>
    </React.Fragment>
  );
};

export default SignOut;
