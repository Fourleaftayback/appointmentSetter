import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import DatePickerButton from "./DatePickerButton";

const ScheduleDisplayCard = ({ teamName, date }) => {
  return (
    <div>
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
    </div>
  );
};

export default ScheduleDisplayCard;
