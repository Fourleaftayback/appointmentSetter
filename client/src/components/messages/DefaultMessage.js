import React from "react";
import { Row, Col } from "reactstrap";

function DefaultMessage() {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <i className="far fa-frown fa-7x mt-4" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className="text-center">
            Sorry but you do not have an Appointment Just Requested
          </h5>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DefaultMessage;
