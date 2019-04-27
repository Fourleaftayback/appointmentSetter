import React from "react";
import { Container } from "reactstrap";
import moment from "moment";

import ScheduleDisplayCard from "../schedule/ScheduleDisplayCard";

const ScheduleContainer = () => {
  return (
    <Container>
      <ScheduleDisplayCard
        teamName="teamName"
        date={moment().format("ll dddd")}
      />
    </Container>
  );
};

export default ScheduleContainer;
