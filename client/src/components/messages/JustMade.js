import React from "react";
import { Row, Col, Card, CardText, CardHeader, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";

import { getType } from "../../controller/dataConverter";

const JustMade = ({ appJustMade }) => {
  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col sm={7} className="m-auto">
          <Card className="p-2">
            <CardHeader className="text-center">
              <b>Your Appointment is pending</b>
            </CardHeader>
            <CardText>
              <b>Type of Appointment:</b>{" "}
              {getType(appJustMade.appointment_type)}
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
              <b>Phone:</b>{" "}
              <NavLink
                className="d-inline"
                href={"tel:" + appJustMade.team_member_info.phone}>
                {appJustMade.team_member_info.phone}
              </NavLink>
            </CardText>
            <CardText>
              <b>Email:</b>{" "}
              <NavLink
                className="d-inline"
                href={"tel:" + appJustMade.team_member_info.email}>
                {appJustMade.team_member_info.email}
              </NavLink>
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4 cus-text-light">
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
