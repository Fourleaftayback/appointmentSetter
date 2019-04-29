import React from "react";
import { Container } from "reactstrap";

import ScheduleContainer from "../schedule/ScheduleContainer";

const Landing = () => {
  //const [test] = useState("test");

  return (
    <Container className="landing">
      <ScheduleContainer />
    </Container>
  );
};

export default Landing;
