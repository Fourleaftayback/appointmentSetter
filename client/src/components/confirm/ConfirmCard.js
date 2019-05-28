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
  CardFooter
} from "reactstrap";

import { getType } from "../../controller/dataConverter";

const ConfirmCard = ({ data, owner }) => {
  console.log(data);
  return (
    <React.Fragment>
      <Col lg={4} className="m-auto">
        <Card>
          <CardHeader>
            {moment(data.appointment_start).format("LT")} to{" "}
            {moment(data.appointment_end).format("LT")}
          </CardHeader>
          <CardBody>
            <CardTitle>{`${getType(
              data.appointment_type
            )}  appointment`}</CardTitle>

            {data.confirmed ? (
              <CardText className="text-primary">
                This appointment has been confirmed
              </CardText>
            ) : (
              <CardText className="text-danger">
                This appointment has not been confirmed yet.
              </CardText>
            )}
          </CardBody>
          <CardFooter>confirm button will go here</CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

ConfirmCard.propTypes = {
  data: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired
};

export default ConfirmCard;

/*
<CardFooter>
            {!data.confirmed ? <ConfirmButton appId={data._id} /> : null}
            {data.client_info._id === owner ? (
              <CancelButtonModal
                appId={data._id}
                url="/team/appointment/delete/"
              />
            ) : null}
          </CardFooter> */
