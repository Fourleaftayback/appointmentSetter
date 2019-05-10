import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

import { getType } from "../../controller/dataConverter";

import ContactButtonModal from "../common/Buttons/ContactButton";
import CancelButtonModal from "../common/Buttons/CancelButtonModal";

const MyAppointment = ({ data }) => {
  let type = getType(data.appointment_type);
  return (
    <React.Fragment>
      <Col md="6" className="mt-3">
        <Card>
          <CardHeader className="text-center">
            <b>{type} appointment</b>
          </CardHeader>
          <CardBody>
            <CardTitle>
              With: <b>{data.team_member_info.first_name}</b>
            </CardTitle>
            <CardText>
              {data.confirmed
                ? "Your appointment has been confirmed for"
                : "You will recieve an Email once the appointment has been confirmed"}
            </CardText>
            <CardText>
              Appointment Time:{" "}
              <b>{moment(data.appointment_start).format("llll")}</b>
            </CardText>
            <CardText>
              Appointment End:{" "}
              <b>{moment(data.appointment_end).format("llll")}</b>
            </CardText>
          </CardBody>
          {/*this will be seperate component*/}
          <CardFooter>
            <CancelButtonModal appId={data._id} />
            <ContactButtonModal
              name={data.team_member_info.first_name}
              phone={data.team_member_info.phone}
              email={data.team_member_info.email}
            />
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

MyAppointment.propTypes = {
  data: PropTypes.object.isRequired
};

export default MyAppointment;
