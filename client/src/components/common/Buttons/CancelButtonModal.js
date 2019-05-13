import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import { deleteAppointment } from "../../../actions/commonAppActions";

const CancelButtonModal = ({ appId, deleteAppointment, url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const confirmDelete = () => {
    deleteAppointment(url, appId);
  };

  return (
    <React.Fragment>
      <Button color="danger" onClick={toggleModal}>
        Cancel
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalBody>
          <b>Are you Sure?</b>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmDelete}>
            {" "}
            Yes
          </Button>
          <Button color="danger" className="float-right" onClick={toggleModal}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

CancelButtonModal.propTypes = {
  appId: PropTypes.string.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  deleteAppointment: deleteAppointment
};

export default connect(
  null,
  mapDispatchToProps
)(CancelButtonModal);
