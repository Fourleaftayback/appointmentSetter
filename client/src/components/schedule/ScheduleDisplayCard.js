import React from "react";
import PropTypes from "prop-types";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import DatePickerButton from "./DatePickerButton";

const ScheduleDisplayCard = ({ teamName, date, data }) => {
  console.log(data);
  /*
  let earlistTime = new Date("2019-05-04T13:00:45.700Z").getTime();
  let latestTime = new Date("2019-05-04T21:00:45.700Z").getTime();
  const halfHour = 1800000;

  const timeBlock = [];
  let i = earlistTime;
  for (i; i < latestTime; i += halfHour) {
    timeBlock.push(i);
  }

  console.log(new Date(booked[1].start));

  let avail = timeBlock.filter(time => {
    return time >= booked[1].start && time < booked[1].end;
    
    booked.map(book => {
      if (time >= book.start && time < book.end) {
        console.log(true);
        console.log(time);
      }
    }); 
  });
 
  console.log(avail);
  */
  return (
    <Col md={4}>
      <Card>
        <CardHeader>
          <h5>{teamName}</h5>
          <DatePickerButton date={date} />
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
