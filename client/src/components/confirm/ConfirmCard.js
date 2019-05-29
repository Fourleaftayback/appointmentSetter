import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";

import { getType } from "../../controller/dataConverter";

const ConfirmCard = ({ data, owner }) => {
  console.log(data, owner);
  return (
    <React.Fragment>
      <Col lg={4} className="m-auto">
        <Card>
          <CardHeader>
            {moment(data.appointment_start).format("LT")} to{" "}
            {moment(data.appointment_end).format("LT")}
          </CardHeader>
          <CardBody>
            <CardTitle>{`${getType(
              data.appointment_type
            )}  appointment`}</CardTitle>
            <CardText>{data._id}</CardText>
            {data.confirmed ? (
              <CardText className="text-primary">
                This appointment has been confirmed
              </CardText>
            ) : (
              <CardText className="text-danger">
                This appointment has not been confirmed yet.
              </CardText>
            )}
          </CardBody>
          <CardFooter>confirm button will go here</CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

ConfirmCard.propTypes = {
  data: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired
};

export default ConfirmCard;
