import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

const Landing = () => {
  const [test] = useState("test");

  return <Container className="landing">{test}</Container>;
};

export default Landing;
