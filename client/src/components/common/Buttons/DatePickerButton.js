import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import InfiniteCalendar from "react-infinite-calendar";
import moment from "moment";

const DatePickerButton = ({ selectedDate, pickDate, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const monthAhead = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + maxDate
  );

  const toggleModal = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const changeDate = date => {
    pickDate(date);
    toggleModal();
  };

  return (
    <React.Fragment>
      <Button color="primary" onClick={toggleModal}>
        {moment(selectedDate).format("ll dddd")}
      </Button>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggleModal}>Choose a date</ModalHeader>
        <ModalBody className="m-auto">
          <InfiniteCalendar
            selected={selectedDate}
            disabledDays={null} //arr
            minDate={today}
            maxDate={monthAhead}
            //width={300}
            height={300}
            displayOptions={{
              overscanMonthCount: 2
            }}
            onSelect={changeDate}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

DatePickerButton.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  pickDate: PropTypes.func.isRequired,
  maxDate: PropTypes.number.isRequired
};

export default DatePickerButton;
