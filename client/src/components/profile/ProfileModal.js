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

import FormItem from "../form/FormItem";

function ProfileModal({
  errors,
  profileModalIsOpen,
  profileModalToggle,
  user
}) {
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone.toString());

  const toggleModal = () => {
    profileModalToggle();
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
                type="text"
                name="first_name"
                placeholder="First Name"
                value={first_name}
                error={errors.first_name}
                onChange={e => setFirstName(e.target.value)}
              />

              <FormItem
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={last_name}
                error={errors.last_name}
                onChange={e => setLastName(e.target.value)}
              />
              <FormItem
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                error={errors.email}
                onChange={e => setEmail(e.target.value)}
              />
              <FormItem
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
            <Button color="primary" onClick={() => console.log("save clicked")}>
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
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profileModalIsOpen: state.views.profileModalIsOpen
});

const mapDispatchToProps = {
  profileModalToggle: profileModalToggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileModal);
