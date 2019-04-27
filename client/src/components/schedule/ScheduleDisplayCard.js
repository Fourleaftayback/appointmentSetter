import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const ScheduleDisplayCard = ({ teamName, date }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h5>{teamName}</h5> <Button color="primary">{date}</Button>
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
