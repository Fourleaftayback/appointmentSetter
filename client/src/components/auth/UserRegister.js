import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "reactstrap";
import { registerUser } from "../../actions/authActions";
import history from "../../history/History";

import FormItem from "../form/FormItem";

const UserRegister = ({ errors, registerUser, isAuthenticated, history }) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      password: password,
      password2: password2
    };
    registerUser(newUser);
  };

  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col md={5} className="m-auto pb-3">
          <h3 className="text-center cus-text-light mt-3">Register</h3>
          <Form className="register-form">
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <Row className="form-row">
              <Col md={6} className="form-group cus-form-group">
                <FormItem
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={first_name}
                  error={errors.first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Col>
              <Col md={6} className="form-group cus-form-group">
                <FormItem
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={last_name}
                  error={errors.last_name}
                  onChange={e => setLastName(e.target.value)}
                />
              </Col>
            </Row>
            <FormItem
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              error={errors.phone}
              onChange={e => setPhone(e.target.value)}
            />
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
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

UserRegister.propTypes = {
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  isAuthenticated: state.auth.isAuthenticated,
  history: history
});

const MapDispatchToProps = {
  registerUser: registerUser
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(withRouter(UserRegister));
