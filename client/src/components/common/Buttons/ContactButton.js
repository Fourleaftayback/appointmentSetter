import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, NavLink } from "reactstrap";

const ContactButtonModal = ({ name, phone, email, floatRight }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <React.Fragment>
      <Button
        color="info"
        className={classnames("", {
          "float-right": floatRight
        })}
        onClick={toggleModal}>
        Contact
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Contact Info</ModalHeader>
        <ModalBody>
          <p>Name: {name}</p>
          <p>
            Phone: <NavLink href={"tel:" + phone}>{phone}</NavLink>
          </p>
          <p>
            Email: <NavLink href={"mailto:" + email}>{email}</NavLink>
          </p>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

ContactButtonModal.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  floatRight: PropTypes.string
};

export default ContactButtonModal;
