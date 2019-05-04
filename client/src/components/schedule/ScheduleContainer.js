import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import { getAllAppointments } from "../../actions/clientAppActions";

import "react-infinite-calendar/styles.css";

import Spinner from "../common/Spinner";
import ScheduleDisplayCard from "../schedule/ScheduleDisplayCard";

const ScheduleContainer = ({ getAllAppointments, schedules, loading }) => {
  let content;

  useEffect(() => {
    getAllAppointments();
  }, []);
  //console.log(schedules);
  const testData = ["Mary" /*, "Karen", "Michelle", "Sarah", "Roy" */];

  let daySchedules = testData.map((name, i) => (
    <ScheduleDisplayCard teamName={name} key={i} />
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
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  schedules: state.clientAppointment.schedules,
  loading: state.views.dataLoading
});

const mapDispatchToProps = {
  getAllAppointments: getAllAppointments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleContainer);
