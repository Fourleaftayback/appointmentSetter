import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Form, Button } from "reactstrap";
import FormItem from "../form/FormItem";

import { resetPassword } from "../../actions/authActions";

const ResetPassword = ({
  errors,
  getUrl,
  putUrl,
  checkToken,
  resetPassword
}) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const indx = window.location.href.lastIndexOf("/");
  const token = window.location.href.substr(indx);

  const onSubmit = e => {
    e.preventDefault();
    const newData = {
      resetPasswordToken: token.replace(/\//g, ""),
      password: password,
      password2: password2
    };
    resetPassword(putUrl, newData);
  };

  useEffect(() => {
    checkToken(getUrl, token);
  }, []);

  return (
    <React.Fragment>
      <Row className="mt-5">
        <Col md="5" className="m-auto">
          <h5 className="text-center cus-text-light mt-3">
            Enter your new password.
          </h5>
          <Form className="mt-4">
            <FormItem
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              error={errors.password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormItem
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              error={errors.password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <Button color="info" block={true} onClick={onSubmit}>
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  getUrl: PropTypes.string.isRequired,
  putUrl: PropTypes.string.isRequired,
  checkToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
