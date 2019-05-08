import React from "react";
import { Container } from "reactstrap";

import ScheduleContainer from "../schedule/ScheduleContainer";

const Landing = () => {
  return (
    <Container className="landing mt-4">
      <ScheduleContainer />
    </Container>
  );
};

export default Landing;
