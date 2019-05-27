import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import { deleteAppointment } from "../../../actions/commonAppActions";
import { deleteModalToggle } from "../../../actions/viewsActions";

const CancelButtonModal = ({
  appId,
  deleteAppointment,
  url,
  deleteModalToggle,
  isOpen
}) => {
  const toggleModal = () => {
    deleteModalToggle();
  };

  const confirmDelete = () => {
    deleteAppointment(url, appId);
  };

  return (
    <React.Fragment>
      <Button color="danger" onClick={toggleModal} className="ml-2">
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
  url: PropTypes.string.isRequired,
  deleteModalToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isOpen: state.views.deleteModalIsOpen
});

const mapDispatchToProps = {
  deleteAppointment: deleteAppointment,
  deleteModalToggle: deleteModalToggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelButtonModal);
