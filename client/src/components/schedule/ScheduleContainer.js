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
  loading
}) => {
  let content;

  useEffect(() => {
    getAllAppointments();
  }, []);

  let daySchedules = teamMembers.map(item => (
    <ScheduleDisplayCard teamName={item.name} key={item.id} />
  ));

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
