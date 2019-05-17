import React from "react";

import { Col, Card, CardBody, CardTitle } from "reactstrap";

const DayOffCard = () => {
  return (
    <React.Fragment>
      <Col md={4} className="m-auto my-5">
        <Card>
          <CardBody>
            <CardTitle>This Team member has the day off</CardTitle>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default DayOffCard;
