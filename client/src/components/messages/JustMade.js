import React from "react";
import { Row, Col, Card, CardTitle, CardText } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";

const JustMade = ({ appJustMade }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <i className="far fa-smile fa-7x mt-4 mb-4" />
        </Col>
      </Row>
      <Row>
        <Col sm={7} className="m-auto">
          <Card className="p-2">
            <CardTitle>Your Appointment is pending</CardTitle>
            <CardText>
              <b>Type of Appointment:</b> {appJustMade.appointment_type}
            </CardText>
            <CardText>
              <b>Start Time:</b>{" "}
              {moment(appJustMade.appointment_start).format("llll")}
            </CardText>
            <CardText>
              <b>End Time:</b>{" "}
              {moment(appJustMade.appointment_end).format("llll")}
            </CardText>
            <CardText>
              <b>With:</b> {appJustMade.team_member_info.first_name}
            </CardText>
            <CardText>
              <b>Phone:</b> {appJustMade.team_member_info.phone}
            </CardText>
            <CardText>
              <b>Email:</b> {appJustMade.team_member_info.email}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4">
            You should receive an email shorty once our team member confirms the
            appointment.
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

JustMade.propTypes = {
  appJustMade: PropTypes.object.isRequired
};

export default JustMade;
