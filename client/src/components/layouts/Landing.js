import React, { useState } from "react";
import { Container } from "reactstrap";

const Landing = () => {
  const [test] = useState("test");

  return (
    <Container className="landing text-center">
      <h3>{test}</h3>
      <hr />
    </Container>
  );
};

export default Landing;
