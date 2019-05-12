import React, { useState } from "react";
//import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";

import FormSelect from "../../form/FormSelect";

const AddAppointment = ({ teamId, day }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeOfAppointment, setTypeOfAppointment] = useState("hair_cut");

  const toggleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  const onSelect = e => {
    const indx = e.target.options.selectedIndex;
    setTypeOfAppointment(e.target.options[indx].value);
  };
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggleModal}>
        Add Appointment
      </Button>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormSelect
              label="Type of Appointment"
              onSelect={onSelect}
              name="typeOfAppointment"
              valueArr={["hair_cut", "shave", "cut_and_shave"]}
              nameArr={["Hair Cut", "Shave", "Cut and Shave"]}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              console.log(teamId + " " + day + " " + typeOfAppointment)
            }>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

AddAppointment.propTypes = {
  teamId: PropTypes.string.isRequired,
  day: PropTypes.instanceOf(Date).isRequired
};

export default AddAppointment;
