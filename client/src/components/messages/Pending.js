import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Badge } from "reactstrap";

import DefaultMessage from "./DefaultMessage";
import JustMade from "./JustMade";

const Pending = ({ appJustMade }) => {
  let message;
  Object.keys(appJustMade).length === 0
    ? (message = <DefaultMessage />)
    : (message = <JustMade />);
  return (
    <React.Fragment>
      {message}
      <Row>
        <Col>
          <h3 className="text-center mt-3">
            <Badge href="/" color="info">
              Home
            </Badge>
          </h3>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Pending.propTypes = {
  appJustMade: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  appJustMade: state.clientAppointment.appJustMade
});

export default connect(
  mapStateToProps,
  null
)(Pending);
