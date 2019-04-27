import React, { useState } from "react";
//import PropTypes from "prop-types";
import { Row, Col, Form, Button } from "reactstrap";

import FormItem from "../form/FormItem";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col className="col-md-4 m-auto pb-3">
          <h3 className="text-center mt-3">Register</h3>
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={null}
              onChange={e => setEmail(e.target.value)}
            />
            <FormItem
              type="text"
              name="first_name"
              placeholder="First name"
              value={first_name}
              error={null}
              onChange={e => setFirstName(e.target.value)}
            />
            <FormItem
              type="text"
              name="last_name"
              placeholder="Last name"
              value={last_name}
              error={null}
              onChange={e => setLastName(e.target.value)}
            />
            <FormItem
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              error={null}
              onChange={e => setPhone(e.target.value)}
            />
            <FormItem
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              error={null}
              onChange={e => setPassword(e.target.value)}
            />
            <FormItem
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              error={null}
              onChange={e => setPassword2(e.target.value)}
            />
            <Button color="info" block={true}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserRegister;
