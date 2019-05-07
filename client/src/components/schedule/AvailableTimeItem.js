import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ListGroupItem } from "reactstrap";

const AvailableTimeItem = ({ teamId, time }) => {
  return (
    <React.Fragment>
      <ListGroupItem>{moment(time).format("LT")}</ListGroupItem>
    </React.Fragment>
  );
};

AvailableTimeItem.propTypes = {
  teamId: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

export default AvailableTimeItem;
