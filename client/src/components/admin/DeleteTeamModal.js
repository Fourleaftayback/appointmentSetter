import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import { deleteTeamUser } from "../../actions/adminActions";
import { deleteTeamToggle } from "../../actions/viewsActions";

const DeleteTeamModal = ({
  teamId,
  isOpen,
  deleteTeamToggle,
  deleteTeamUser
}) => {
  const toggleModal = () => {
    deleteTeamToggle();
  };

  const confirmDelete = () => {
    deleteTeamUser(teamId);
  };

  return (
    <React.Fragment>
      <Button color="danger" onClick={toggleModal}>
        Delete User
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

DeleteTeamModal.propTypes = {
  teamId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  deleteTeamToggle: PropTypes.func.isRequired,
  deleteTeamUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isOpen: state.views.deleteTeamIsOpen
});

const mapDispatchToProps = {
  deleteTeamToggle: deleteTeamToggle,
  deleteTeamUser: deleteTeamUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteTeamModal);
