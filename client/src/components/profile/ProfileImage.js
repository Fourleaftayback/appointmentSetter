import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "reactstrap";

const ImageStyle = {
  height: "2.75rem",
  width: "2.75rem"
};

const ProfileImage = ({ onClick, imageUrl }) => {
  return (
    <React.Fragment>
      <NavLink onClick={onClick}>
        <img
          src={imageUrl}
          className="rounded-circle"
          alt="Profile"
          style={ImageStyle}
        />
      </NavLink>
    </React.Fragment>
  );
};

ProfileImage.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default ProfileImage;
