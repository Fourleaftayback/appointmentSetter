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

import ContactButton from "../../common/Buttons/ContactButton";
import ConfirmButton from "../buttons/ConfirmButton";
import CancelButtonModal from "../../common/Buttons/CancelButtonModal";

import { getType, firstUpperCase } from "../../../controller/dataConverter";

const AppointmentCard = ({ data, owner }) => {
  return (
    <React.Fragment>
      <Col lg={4}>
        <Card>
          <CardHeader>{moment(data.appointment_start).format("LT")}</CardHeader>
          <CardBody>
            <CardTitle>{`${getType(
              data.appointment_type
            )}  appointment`}</CardTitle>
            <CardText>
              Client Name: {data.client_info.first_name}{" "}
              {data.client_info.last_name}
            </CardText>
            <CardText>
              <ContactButton
                phone={data.client_info.phone}
                email={data.client_info.email}
                name={firstUpperCase(data.client_info.first_name)}
              />
            </CardText>
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
          <CardFooter>
            {!data.confirmed ? <ConfirmButton appId={data._id} /> : null}
            {data.team_member_info._id === owner ? (
              <CancelButtonModal
                appId={data._id}
                url="/team/appointment/delete/"
              />
            ) : null}
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};
AppointmentCard.propTypes = {
  data: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired
};

export default AppointmentCard;
