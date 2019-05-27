import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import TeamMemberPicker from "./TeamMemberPicker";
import DatePickerButton from "../../components/common/Buttons/DatePickerButton";
import AddAppointment from "./buttons/AddAppointment";
import AppointmentCard from "./appointmentCard/AppointmentCard";
import DayOffCard from "./appointmentCard/DayOffCard";
import MessageCard from "../messages/MessageCard";

import {
  getAllTeamApp,
  getAllClients,
  getAppByTeamId,
  filterByDateAndId
} from "../../actions/teamAppActions";
import { setToMinute } from "../../controller/dataConverter";

const TeamLanding = ({
  getAllTeamApp,
  user,
  teamMembers,
  appointments,
  getAllClients,
  getAppByTeamId,
  appByCurrentTeamId,
  filterByDateAndId,
  appByDateAndId
}) => {
  const [currentUserId, setCurrentUserId] = useState(user.id);
  const [selectedDate, setSelectedDate] = useState(
    setToMinute(new Date(), 0, 0)
  );

  const selectUser = e => {
    const indx = e.target.options.selectedIndex;
    setCurrentUserId(e.target.options[indx].value);
  };

  const changeDate = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getAllTeamApp();
    getAllClients();
    setCurrentUserId(user.id);
  }, []);

  useEffect(() => {
    getAppByTeamId(currentUserId, appointments);
  }, [appointments, currentUserId]);

  useEffect(() => {
    filterByDateAndId(currentUserId, selectedDate, appointments);
  }, [currentUserId, selectedDate, appointments]);

  const cards = appByDateAndId.map(item =>
    !item.day_off ? (
      <AppointmentCard data={item} key={item._id} owner={user.id} />
    ) : (
      <DayOffCard key={item._id} />
    )
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
        <Col md="4" className="mb-2 team-btn-container">
          <DatePickerButton
            selectedDate={selectedDate}
            pickDate={changeDate}
            maxDate={90}
          />
        </Col>
        <Col md="4" className="mb-2 team-btn-container">
          <AddAppointment
            teamId={currentUserId}
            day={selectedDate}
            appointmentsByTeam={appByCurrentTeamId}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        {appByDateAndId.length === 0 ? (
          <MessageCard
            header="No Appointments."
            body="This team member does not have any appointments on this day. Please choose another date."
            linkTo={false}
          />
        ) : (
          cards
        )}
      </Row>
    </React.Fragment>
  );
};

TeamLanding.propTypes = {
  user: PropTypes.object.isRequired,
  getAllTeamApp: PropTypes.func.isRequired,
  teamMembers: PropTypes.array.isRequired,
  appointments: PropTypes.array.isRequired,
  getAllClients: PropTypes.func.isRequired,
  getAppByTeamId: PropTypes.func.isRequired,
  appByCurrentTeamId: PropTypes.array.isRequired,
  filterByDateAndId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  teamMembers: state.clientAppointment.teamMembers,
  appointments: state.teamAppointment.schedules,
  appByCurrentTeamId: state.teamAppointment.appByCurrentTeamId,
  appByDateAndId: state.teamAppointment.appByDateAndId
});

const mapDispatchToProps = {
  getAllTeamApp: getAllTeamApp,
  getAllClients: getAllClients,
  getAppByTeamId: getAppByTeamId,
  filterByDateAndId: filterByDateAndId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamLanding);
