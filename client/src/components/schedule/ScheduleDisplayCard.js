import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  roundToDay,
  setAvailableTimes,
  checkAlltimes
} from "../../controller/dataConverter";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import DatePickerButton from "./DatePickerButton";

const ScheduleDisplayCard = ({ teamName, data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //const [todaysAppointments, setTodaysAppointments] = useState([]);
  // const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const changeDate = date => {
    setSelectedDate(date);
  };

  const getAvaliableTimes = (bookedTimes, day) => {
    const today = roundToDay(day).toString();
    const earlistTime = setAvailableTimes(today, 13);
    const latestTime = setAvailableTimes(today, 21);
    const halfHour = 1800000;
    const timeBlock = [];
    let i = earlistTime;
    for (i; i < latestTime; i += halfHour) {
      timeBlock.push(i);
    }
    let arr = timeBlock.filter(time => {
      if (!checkAlltimes(time, bookedTimes)) {
        return time;
      }
    });
    console.log(arr);
  };

  useEffect(() => {
    getAvaliableTimes(data, selectedDate);
  }, [selectedDate]);

  return (
    <Col md={4}>
      <Card>
        <CardHeader>
          <h5>{teamName}</h5>
          <DatePickerButton selectedDate={selectedDate} pickDate={changeDate} />
        </CardHeader>

        <CardBody>
          <ListGroup>
            <ListGroupItem>loop thrh times</ListGroupItem>
            <ListGroupItem>loop thrh times</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

ScheduleDisplayCard.propTypes = {
  teamName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default ScheduleDisplayCard;
