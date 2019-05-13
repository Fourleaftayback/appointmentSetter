import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import { confirmAppointment } from "../../../actions/teamAppActions";

const ConfirmButton = ({ confirmAppointment, appId }) => {
  const onSubmit = () => {
    confirmAppointment(appId);
  };

  return (
    <React.Fragment>
      <Button color="info" onClick={onSubmit}>
        Confirm
      </Button>
    </React.Fragment>
  );
};

ConfirmButton.propTypes = {
  confirmAppointment: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  confirmAppointment: confirmAppointment
};

export default connect(
  null,
  mapDispatchToProps
)(ConfirmButton);
