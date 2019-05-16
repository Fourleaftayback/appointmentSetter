import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Row, Col } from "reactstrap";

import { sendResetRequest } from "../../actions/commonAppActions";
import FormItem from "../form/FormItem";

const ResetRequest = ({ errors, message, sendResetRequest }) => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    const userEmail = {
      email: email
    };

    window.location.pathname === "/team/forgot"
      ? sendResetRequest("/reset/team/forgot", userEmail)
      : sendResetRequest("/reset/user/forgot", userEmail);
  };
  let content;

  message.success
    ? (content = <h4 className="text-center mt-4">{message.success}</h4>)
    : (content = (
        <React.Fragment>
          <h5 className="text-center mt-4">Reset Your Password</h5>
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button color="info" block={true} onClick={onSubmit}>
              Login
            </Button>
          </Form>
        </React.Fragment>
      ));

  return (
    <React.Fragment>
      <Row className="mt-5">
        <Col className="col-md-6 m-auto border border-secondary rounded p-3">
          {content}
        </Col>
      </Row>
    </React.Fragment>
  );
};

ResetRequest.propTypes = {
  errors: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  sendResetRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  message: state.views.message
});

export default connect(
  mapStateToProps,
  { sendResetRequest }
)(ResetRequest);