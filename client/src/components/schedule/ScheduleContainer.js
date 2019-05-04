import React from "react";
import { Container, Row } from "reactstrap";

import "react-infinite-calendar/styles.css";

import ScheduleDisplayCard from "../schedule/ScheduleDisplayCard";

const ScheduleContainer = () => {
  //fetch data here through useEffect and redux
  const testData = ["Mary" /*, "Karen", "Michelle", "Sarah", "Roy" */];
  let daySchedules = testData.map((name, i) => (
    <ScheduleDisplayCard teamName={name} key={i} />
  ));
  return (
    <Container>
      <Row>{daySchedules}</Row>
    </Container>
  );
};

export default ScheduleContainer;
