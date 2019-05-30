import React from "react";
import { connect } from "react-redux";

import { Row, Col, Form } from "reactstrap";
import FormItem from "../form/FormItem";

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md="5" className="m-auto mt-2">
          <h5 className="text-center cus-text-light mt-3">
            Enter your new password.
          </h5>
          <Form>form here</Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default connect()(ResetPassword);
