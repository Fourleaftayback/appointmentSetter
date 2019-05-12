import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { Modal, ModalHeader, ModalBody, Button, Form } from "reactstrap";

import { userLoginModalToggle } from "../../actions/viewsActions";
import { reqAppointment } from "../../actions/clientAppActions";

import FormSelect from "../form/FormSelect";

const AvailableTimeItem = ({
  teamId,
  teamName,
  time,
  isLoggedIn,
  userLoginModalToggle,
  reqAppointment
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeOfAppointment, setTypeOfAppointment] = useState("hair_cut");

  const toggleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  const openModal = () => {
    isLoggedIn ? toggleModal() : userLoginModalToggle();
  };

  const onSelect = e => {
    const indx = e.target.options.selectedIndex;
    setTypeOfAppointment(e.target.options[indx].value);
  };

  const getEndTime = (start, type) => {
    switch (type) {
      case "hair_cut":
        return start + 1800000;
      case "shave":
        return start + 1800000;
      case "cut_and_shave":
        return start + 3600000;
      default:
        return start;
    }
  };

  const submitReq = e => {
    e.preventDefault();
    let endTime = getEndTime(time, typeOfAppointment);
    let newAppointment = {
      appointment_type: typeOfAppointment,
      appointment_start: new Date(time),
      appointment_end: new Date(endTime),
      teamId: teamId
    };

    reqAppointment(newAppointment);
  };

  return (
    <React.Fragment>
      <Button
        outline
        color="secondary"
        block
        className="mb-1"
        onClick={openModal}>
        {moment(time).format("LT")}
      </Button>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Request an appointment</ModalHeader>
        <ModalBody className="mt-1">
          <p>
            <b>Book with: {teamName}</b>
          </p>
          <p>Time: {moment(time).format("llll")}</p>
          <Form>
            <FormSelect
              label="Type of Appointment"
              onSelect={onSelect}
              name="typeOfAppointment"
              valueArr={["hair_cut", "shave", "cut_and_shave"]}
              nameArr={["Hair Cut", "Shave", "Cut and Shave"]}
            />
          </Form>
          <Button color="info" onClick={submitReq}>
            Request
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

AvailableTimeItem.propTypes = {
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userLoginModalToggle: PropTypes.func.isRequired,
  reqAppointment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  userLoginModalToggle: userLoginModalToggle,
  reqAppointment: reqAppointment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableTimeItem);
