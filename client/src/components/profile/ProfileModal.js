import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  NavLink,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { profileModalToggle } from "../../actions/viewsActions";
import { modifyUser } from "../../actions/commonAppActions";

import FormItem from "../form/FormItem";

function ProfileModal({
  errors,
  profileModalIsOpen,
  profileModalToggle,
  user,
  modifyUser,
  isTeam
}) {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone.toString());
  const [image, setImage] = useState("");

  const toggleModal = () => {
    profileModalToggle();
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("phone", phone);
    console.log(email, phone, image);
    /*
    isTeam
      ? modifyUser("/team/modify", formData)
      : modifyUser("/user/modify", formData); */
  };
  const changeImage = e => {
    setImage(e.target.files[0]);
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
            <Form name="form">
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
              <FormGroup>
                <Label>Profile Image</Label>
                <Input
                  type="file"
                  name="image"
                  className={classnames("form-control", {
                    "is-invalid": errors.image
                  })}
                  onChange={changeImage}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {user.hasOwnProperty("isAdmin") ? (
              <NavLink href="/timeoff">Time Off</NavLink>
            ) : null}
            {user.isAdmin ? (
              <NavLink href="/manage">Manage Team</NavLink>
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
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  profileModalIsOpen: PropTypes.bool.isRequired,
  profileModalToggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  modifyUser: PropTypes.func.isRequired,
  isTeam: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profileModalIsOpen: state.views.profileModalIsOpen,
  isTeam: state.auth.user.hasOwnProperty("isAdmin")
});

const mapDispatchToProps = {
  profileModalToggle: profileModalToggle,
  modifyUser: modifyUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileModal);
