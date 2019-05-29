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

import ConfirmButton from "../team/buttons/ConfirmButton";

import { getType } from "../../controller/dataConverter";

const ConfirmCard = ({ data }) => {
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
            <CardText>
              <b>Client Name:</b> {data.first_name} {data.last_name}
            </CardText>
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
          <CardFooter>
            {!data.confirmed && data.hasOwnProperty("_id") ? (
              <ConfirmButton appId={data._id} />
            ) : null}
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

ConfirmCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default ConfirmCard;
