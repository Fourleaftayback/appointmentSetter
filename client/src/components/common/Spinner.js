import React from "react";
import { Spinner } from "reactstrap";

export default () => {
  return (
    <div className="spinner text-center mt-5">
      <Spinner className="mt-5" type="grow" color="info" />
      <Spinner className="mt-5" type="grow" color="secondary" />
      <Spinner className="mt-5" type="grow" color="info" />
    </div>
  );
};
