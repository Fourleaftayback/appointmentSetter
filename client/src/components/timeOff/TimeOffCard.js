import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button
} from "reactstrap";

const TimeOffCard = ({ data }) => {
  const onSubmit = () => {
    data.days_off_group ? console.log(true) : console.log(false);
  };
  return (
    <React.Fragment>
      <Col md={4} className="mb-3">
        <Card>
          <CardHeader className="text-center">
            {moment(data.appointment_start).format("dddd, MMM DD, YYYY")}
          </CardHeader>
          <CardBody>
            <CardTitle>Day Off</CardTitle>
            <CardText>
              Reoccuring: {data.days_off_group ? "Yes" : "No"}
            </CardText>
          </CardBody>
          <CardFooter>
            <Button color="danger" size="sm" onClick={onSubmit}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};
TimeOffCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default TimeOffCard;
