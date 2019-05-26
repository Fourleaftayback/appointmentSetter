import React from "react";

import { Row, Col, Badge } from "reactstrap";

const NotAuthorized = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3 className="text-center cus-text-light mt-4 ">Sorry...</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <i className="fas fa-ban fa-5x text-warning mt-3" />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4 cus-text-light">
            You are missing the required rights to access this page.
          </p>
        </Col>
      </Row>
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

export default NotAuthorized;
