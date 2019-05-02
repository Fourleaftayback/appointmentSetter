import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "reactstrap";
import { registerUser } from "../../actions/authActions";

import FormItem from "../form/FormItem";

const UserRegister = ({ errors, registerUser, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoggedIn] = useState(isAuthenticated);

  const history = createBrowserHistory();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("k");
      history.push("");
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
    registerUser(newUser /*, history */);
  };

  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col md={4} className="m-auto pb-3">
          <h3 className="text-center mt-3">Register</h3>
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <Row>
              <Col md={6} className="pr-1">
                <FormItem
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={first_name}
                  error={errors.first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Col>
              <Col md={6} className="pl-1">
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(UserRegister));
