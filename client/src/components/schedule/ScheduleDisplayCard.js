import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uniqId from "uniqid";

import { getAvaliableTimes } from "../../controller/dataConverter";

import { Col, Card, CardHeader, CardBody, ListGroup } from "reactstrap";

import { checkDayOff } from "../../controller/dataConverter";

import DatePickerButton from "../common/Buttons/DatePickerButton";
import AvailableTimeItem from "./AvailableTimeItem";
import ProfileImage from "../common/imageComponents/ProfileImage";

const ScheduleDisplayCard = ({ teamName, data, teamId, teamImage }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isDayOff, setIsDayOff] = useState(false);

  const changeDate = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let times = getAvaliableTimes(data, selectedDate, 9, 17);
    setAvailableTimeSlots(times);
    setIsDayOff(checkDayOff(data, teamId, selectedDate));
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
    <Col md={4} className="mb-3">
      <Card>
        <CardHeader>
          {teamImage !== "" ? (
            <ProfileImage
              imageUrl={teamImage}
              size="4rem"
              cusClass="text-center p-0"
            />
          ) : (
            <i className="fas fa-user-circle fa-4x d-block text-center" />
          )}
          <h5 className="text-center mt-2">{teamName}</h5>
          <DatePickerButton
            selectedDate={selectedDate}
            pickDate={changeDate}
            maxDate={31}
            cusClass="btn-block"
          />
        </CardHeader>

        <CardBody>
          <ListGroup>
            {availableTimeSlots.length !== 0 && !isDayOff ? (
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
  teamImage: PropTypes.string,
  data: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired
};

export default ScheduleDisplayCard;
