import React, { useState, useEffect } from "react";
//import { connect } from "react-redux";
import moment from "moment";
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

import {
  getAvaliableTimes,
  getEndTime
} from "../../../controller/dataConverter";

const AddAppointment = ({ teamId, day, appointmentsByTeam }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timeOfApp, setTimeOfApp] = useState();
  const [typeOfAppointment, setTypeOfAppointment] = useState("hair_cut");

  const toggleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  const selectType = e => {
    const indx = e.target.options.selectedIndex;
    setTypeOfAppointment(e.target.options[indx].value);
  };

  const selectTime = e => {
    const indx = e.target.options.selectedIndex;
    setTimeOfApp(Number(e.target.options[indx].value));
  };

  const onSubmit = () => {
    const appData = {
      user: "",
      appointment_type: typeOfAppointment,
      appointment_start: new Date(timeOfApp),
      appointment_end: new Date(getEndTime(timeOfApp, typeOfAppointment)),
      team_member_id: teamId
    };
    console.log(appData);
  };

  const times = getAvaliableTimes(appointmentsByTeam, day, 9, 17);

  useEffect(() => {
    setTimeOfApp(times[0]);
  }, []);

  useEffect(() => {
    setTimeOfApp(times[0]);
  }, [day, teamId]);

  return (
    <React.Fragment>
      <Button color="primary" onClick={toggleModal}>
        Add Appointment
      </Button>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <p>
            <b>Date:</b> {moment(day).format("ll dddd")}
          </p>
          <Form>
            <FormSelect
              label="Time of appointment"
              onSelect={selectTime}
              name="timeOfAppointment"
              valueArr={times}
              nameArr={times.map(item => moment(item).format("LT"))}
            />
            <FormSelect
              label="Type of Appointment"
              onSelect={selectType}
              name="typeOfAppointment"
              valueArr={["hair_cut", "shave", "cut_and_shave"]}
              nameArr={["Hair Cut", "Shave", "Cut and Shave"]}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
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
  day: PropTypes.instanceOf(Date).isRequired,
  appointmentsByTeam: PropTypes.array.isRequired
};

export default AddAppointment;
