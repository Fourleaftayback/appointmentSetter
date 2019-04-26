import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form
} from "reactstrap";

import FormItem from "../form/FormItem";

const LoginModal = ({ loginType, forgotPath }) => {
  const [modalIsOpen, toggleModal] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginToggle = () => {
    modalIsOpen ? toggleModal(false) : toggleModal(true);
  };

  return (
    <React.Fragment>
      <NavLink className="text-white text-center p-0" onClick={loginToggle}>
        {loginType} Login
      </NavLink>
      <Modal isOpen={modalIsOpen} toggle={loginToggle}>
        <ModalHeader toggle={loginToggle} className="p-3">
          {loginType} Login
        </ModalHeader>
        <ModalBody toggle={loginToggle}>
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="example@test.com"
              value={email}
              label="Email"
              error={null}
              onChange={e => setEmail(e.target.value)}
            />
            <FormItem
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              label="Password"
              error={null}
              onChange={e => setPassword(e.target.value)}
            />
            <Button color="info" block={true}>
              Login
            </Button>
          </Form>
          <NavLink
            className="text-primary text-center mt-3 p-0"
            href={forgotPath}>
            Forgot Password
          </NavLink>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

LoginModal.propTypes = {
  loginType: PropTypes.string.isRequired,
  forgotPath: PropTypes.string.isRequired
};

export default LoginModal;
