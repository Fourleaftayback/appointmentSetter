import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import { getAllAppointments } from "../../actions/clientAppActions";

import "react-infinite-calendar/styles.css";

import Spinner from "../common/Spinner";
import ScheduleDisplayCard from "../schedule/ScheduleDisplayCard";

const ScheduleContainer = ({
  getAllAppointments,
  schedules,
  teamMembers,
  loading,
  daysOff
}) => {
  let content;
  useEffect(() => {
    getAllAppointments();
  }, []);

  let daySchedules = teamMembers.map(item => {
    let memberData = schedules.filter(data => data.team_member_id === item._id);

    return (
      <ScheduleDisplayCard
        teamName={item.first_name}
        key={item._id}
        teamId={item._id}
        teamImage={item.image_url}
        data={memberData}
      />
    );
  });

  loading ? (content = <Spinner />) : (content = daySchedules);

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
};

ScheduleContainer.propTypes = {
  getAllAppointments: PropTypes.func.isRequired,
  schedules: PropTypes.array.isRequired,
  teamMembers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  schedules: state.clientAppointment.schedules,
  teamMembers: state.clientAppointment.teamMembers,
  loading: state.views.dataLoading
});

const mapDispatchToProps = {
  getAllAppointments: getAllAppointments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleContainer);
