import React from "react";
import { connect } from "react-redux";
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

import { deleteDaysOff } from "../../actions/daysOffActions";

const TimeOffCard = ({ data, deleteDaysOff }) => {
  const onSubmit = () => {
    data.days_off_group
      ? deleteDaysOff("/daysoff/removemany/", data.days_off_group)
      : deleteDaysOff("/daysoff/removeone/", data._id);
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

const mapDispatchToProps = {
  deleteDaysOff: deleteDaysOff
};

export default connect(
  null,
  mapDispatchToProps
)(TimeOffCard);
