import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

//import state auth state here to verify that they are logged in
//import veiws action to open modal
//if they are not logged in then open login modal or collapsed
//if they are logged in open request appointment modal (this will have to managed from a local state)

const AvailableTimeItem = ({ teamId, teamName, time }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeOfAppointment, setTypeOfAppointment] = useState("hair_cut");

  const toggleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
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
    console.log(newAppointment);
  };

  return (
    <React.Fragment>
      <Button
        outline
        color="secondary"
        block
        className="mb-1"
        onClick={toggleModal}>
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
            <FormGroup>
              <Label for="typeOfAppointment">Type of Appointment</Label>
              <Input
                type="select"
                name="typeOfAppointment"
                id="typeOfAppointment"
                onChange={onSelect}>
                <option value="hair_cut">Hair Cut</option>
                <option value="shave">Shave</option>
                <option value="cut_and_shave">Cut and Shave</option>
              </Input>
              <Button color="info" onClick={submitReq}>
                Request
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

AvailableTimeItem.propTypes = {
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

export default AvailableTimeItem;
