import React, { useState } from "react";
import { connect } from "react-redux";
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

const LoginModal = ({
  loginType,
  forgotPath,
  login,
  errors,
  modalToggle,
  modalIsOpen
}) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    login(userData);
  };

  const toggleModal = () => {
    modalToggle();
  };

  return (
    <React.Fragment>
      <NavLink className="cus-text-light p-0" onClick={toggleModal}>
        {loginType} Login
      </NavLink>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{loginType} Login</ModalHeader>
        <ModalBody className="mt-3">
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormItem
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              error={errors.password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button color="info" block={true} onClick={onSubmit}>
              Login
            </Button>
          </Form>
          <NavLink
            className="text-primary text-center mt-3 p
            -0"
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
  forgotPath: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(LoginModal);
