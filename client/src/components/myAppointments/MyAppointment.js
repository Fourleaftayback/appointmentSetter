import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

const MyAppointment = ({ data }) => {
  const getType = type => {
    switch (type) {
      case "hair_cut":
        return "Hair Cut";
      case "shave":
        return "Shave";
      case "cut_and_shave":
        return "Cut And Shave";
      default:
        return "Other type of";
    }
  };

  let type = getType(data.appointment_type);
  return (
    <React.Fragment>
      <Col md="6" className="mt-3">
        <Card>
          <CardHeader className="text-center">
            <b>{type} appointment</b>
          </CardHeader>
          <CardBody>
            <CardTitle>
              With: <b>{data.team_member_info.first_name}</b>
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
          </CardBody>
          {/*this will be seperate component*/}
          <CardFooter>
            <Button color="danger">Cancel</Button>
            <Button color="info" className="float-right">
              Contact
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

MyAppointment.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(
  null,
  null
)(MyAppointment);
