import React from "react";
import { Row, Col } from "reactstrap";

function DefaultMessage() {
  return (
    <React.Fragment>
      <Row>
        <Col className="text-center mt-5">
          <i className="far fa-frown fa-5x text-warning" />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          <h5 className="text-center cus-text-light">
            Sorry but you do not have an Appointment Just Requested
          </h5>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DefaultMessage;
