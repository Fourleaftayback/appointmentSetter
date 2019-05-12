import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uniqId from "uniqid";

import { getAvaliableTimes } from "../../controller/dataConverter";

import { Col, Card, CardHeader, CardBody, ListGroup } from "reactstrap";

import DatePickerButton from "../common/Buttons/DatePickerButton";
import AvailableTimeItem from "./AvailableTimeItem";

const ScheduleDisplayCard = ({ teamName, data, teamId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const changeDate = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let times = getAvaliableTimes(data, selectedDate, 9, 17);
    setAvailableTimeSlots(times);
  }, [selectedDate]);

  useEffect(() => {
    let times = getAvaliableTimes(data, selectedDate, 9, 17);
    setAvailableTimeSlots(times);
  }, []);

  let listItems = availableTimeSlots.map(item => (
    <AvailableTimeItem
      time={item}
      teamId={teamId}
      teamName={teamName}
      key={uniqId()}
    />
  ));

  return (
    <Col md={4}>
      <Card>
        <CardHeader>
          <h5>{teamName}</h5>
          <DatePickerButton
            selectedDate={selectedDate}
            pickDate={changeDate}
            maxDate={31}
          />
        </CardHeader>

        <CardBody>
          <ListGroup>
            {availableTimeSlots.length !== 0 ? (
              listItems
            ) : (
              <p>
                Sorry but this team member is not have any available times
                today. Please check another date for their availability.
              </p>
            )}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

ScheduleDisplayCard.propTypes = {
  teamName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired
};

export default ScheduleDisplayCard;
