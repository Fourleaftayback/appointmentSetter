import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const JustMade = ({ appJustMade }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <i className="far fa-smile fa-7x mt-4" />
        </Col>
      </Row>
      <Row>
        <Col>{/* place data here */}</Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4">
            You should receive an email shorty once our team member confirms the
            appointment.
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

JustMade.propTypes = {
  appJustMade: PropTypes.object.isRequired
};

export default JustMade;
