import React, { useState } from "react";

const Landing = () => {
  const [test, setTest] = useState("test");
  return <div>this is a landing {test}</div>;
};

export default Landing;
