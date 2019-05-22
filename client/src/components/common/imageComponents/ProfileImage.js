import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "reactstrap";

const ProfileImage = ({ onClick, imageUrl, size }) => {
  const ImageSize = {
    height: size,
    width: size
  };

  return (
    <React.Fragment>
      <NavLink onClick={onClick}>
        <img
          src={imageUrl}
          className="rounded-circle"
          alt="Profile"
          style={ImageSize}
        />
      </NavLink>
    </React.Fragment>
  );
};

ProfileImage.propTypes = {
  onClick: PropTypes.func,
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

export default ProfileImage;
