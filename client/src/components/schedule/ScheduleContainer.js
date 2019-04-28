import React from "react";
import { Container } from "reactstrap";

import "react-infinite-calendar/styles.css";

import ScheduleDisplayCard from "../schedule/ScheduleDisplayCard";

const ScheduleContainer = () => {
  return (
    <Container>
      <ScheduleDisplayCard teamName="teamName" />
    </Container>
  );
};

export default ScheduleContainer;
