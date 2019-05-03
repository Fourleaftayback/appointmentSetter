import React from "react";

import { Row, Col, Badge } from "reactstrap";

const NotAuthorized = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3 className="text-center mt-4">Sorry...</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <i className="fas fa-ban fa-7x" />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4">
            You are missing the required rights to access this page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4">
            <h3>
              <Badge href="/" color="info">
                Home
              </Badge>
            </h3>
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NotAuthorized;
