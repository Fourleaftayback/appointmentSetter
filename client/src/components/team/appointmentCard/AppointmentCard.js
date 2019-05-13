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

import ContactButton from "../../common/Buttons/ContactButton";

import { getType } from "../../../controller/dataConverter";

const AppointmentCard = ({ data }) => {
  //body inverse color="primary"
  return (
    <React.Fragment>
      <Col md={4}>
        <Card>
          <CardHeader>{moment(data.appointment_start).format("LT")}</CardHeader>
          <CardBody>
            <CardTitle>{`${getType(
              data.appointment_type
            )}  appointment`}</CardTitle>
            <CardText>
              Client Name: {data.client_info.first_name}{" "}
              {data.client_info.last_name}
            </CardText>
            <CardText>
              <ContactButton
                phone={data.client_info.phone}
                email={data.client_info.email}
              />
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
          <CardFooter>buttons here </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};
AppointmentCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default AppointmentCard;
