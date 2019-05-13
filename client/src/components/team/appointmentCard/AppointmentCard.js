import React from "react";
import PropTypes from "prop-types";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";

const AppointmentCard = () => {
  return (
    <Col md={4}>
      <Card>
        <CardHeader>date and type</CardHeader>

        <CardBody>deatails here </CardBody>
        <CardFooter>buttons here </CardFooter>
      </Card>
    </Col>
  );
};

export default AppointmentCard;
