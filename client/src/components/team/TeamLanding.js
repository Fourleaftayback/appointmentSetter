import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import TeamMemberPicker from "./TeamMemberPicker";
import DatePickerButton from "../../components/common/Buttons/DatePickerButton";
import AddAppointment from "./buttons/AddAppointment";

import { getAllTeamApp } from "../../actions/teamAppActions";
import { roundToDay } from "../../controller/dataConverter";

const TeamLanding = ({ getAllTeamApp, user, teamMembers, appointments }) => {
  const [currentUserId, setCurrentUserId] = useState(user.id);
  const [selectedDate, setSelectedDate] = useState(roundToDay(new Date()));

  const selectUser = e => {
    const indx = e.target.options.selectedIndex;
    setCurrentUserId(e.target.options[indx].value);
  };

  const changeDate = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getAllTeamApp();
    setCurrentUserId(user.id);
  }, []);

  const appointmentsByTeam = appointments.filter(
    item => item.team_member_id === currentUserId
  );

  return (
    <React.Fragment>
      <Row className="text-center mt-4">
        <Col md="4">
          <TeamMemberPicker
            firstUser={user}
            teamMembers={teamMembers}
            selectUser={selectUser}
          />
        </Col>
        <Col md="4">
          <DatePickerButton
            selectedDate={selectedDate}
            pickDate={changeDate}
            maxDate={90}
          />
        </Col>
        <Col md="4">
          <AddAppointment
            teamId={currentUserId}
            day={selectedDate}
            appointmentsByTeam={appointmentsByTeam}
          />
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col md="4"> Cards goes Here</Col>
        <Col md="4"> Cards goes Here</Col>
        <Col md="4"> Cards goes Here</Col>
      </Row>
    </React.Fragment>
  );
};

TeamLanding.propTypes = {
  user: PropTypes.object.isRequired,
  getAllTeamApp: PropTypes.func.isRequired,
  teamMembers: PropTypes.array.isRequired,
  appointments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  teamMembers: state.clientAppointment.teamMembers,
  appointments: state.teamAppointment.schedules
});

const mapDispatchToProps = {
  getAllTeamApp: getAllTeamApp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamLanding);
