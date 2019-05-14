import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  NavLink,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form
} from "reactstrap";

import { profileModalToggle } from "../../actions/viewsActions";
import { modifyUser } from "../../actions/commonAppActions";

import FormItem from "../form/FormItem";

function ProfileModal({
  errors,
  profileModalIsOpen,
  profileModalToggle,
  user,
  modifyUser
}) {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone.toString());

  const toggleModal = () => {
    profileModalToggle();
  };

  const onSubmit = () => {
    const userInfo = {
      email: email,
      phone: phone
    };
    modifyUser("/user/modify", userInfo);
  };
  return (
    <React.Fragment>
      <NavItem>
        <NavLink className="text-white" onClick={toggleModal}>
          <i className="fas fa-user-circle fa-2x" />
        </NavLink>
        <Modal isOpen={profileModalIsOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Profile</ModalHeader>
          <ModalBody>
            <Form>
              <FormItem
                label="Email Address"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                error={errors.email}
                onChange={e => setEmail(e.target.value)}
              />
              <FormItem
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                error={errors.phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            {user.isAdmin ? (
              <NavLink href="/manage">Manange Team</NavLink>
            ) : null}
            <Button color="primary" onClick={onSubmit}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </NavItem>
    </React.Fragment>
  );
}

ProfileModal.propTypes = {
  errors: PropTypes.object.isRequired,
  profileModalIsOpen: PropTypes.bool.isRequired,
  profileModalToggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  modifyUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profileModalIsOpen: state.views.profileModalIsOpen
});

const mapDispatchToProps = {
  profileModalToggle: profileModalToggle,
  modifyUser: modifyUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileModal);
