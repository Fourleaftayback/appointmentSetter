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

import { loginUser } from "../../actions/authActions";
import { userModalToggle } from "../../actions/viewsActions";

import FormItem from "../form/FormItem";

const LoginModal = ({
  loginType,
  forgotPath,
  loginUser,
  errors,
  userModalToggle,
  loginModalIsOpen
}) => {
  //const [modalIsOpen, toggleModal] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  /*
  const loginToggle = () => {
    modalIsOpen ? toggleModal(false) : toggleModal(true);
  };
  */
  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };
    loginUser(userData);
  };

  const toggleModal = () => {
    userModalToggle();
  };

  return (
    <React.Fragment>
      <NavLink className="text-white text-center p-0" onClick={toggleModal}>
        {loginType} Login
      </NavLink>
      <Modal isOpen={loginModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} className="p-3">
          {loginType} Login
        </ModalHeader>
        <ModalBody>
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
  forgotPath: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loginModalIsOpen: PropTypes.bool.isRequired,
  userModalToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loginModalIsOpen: state.views.userLoginIsOpen
});

export default connect(
  mapStateToProps,
  { loginUser, userModalToggle }
)(LoginModal);
