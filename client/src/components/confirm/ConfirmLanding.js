import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col } from "reactstrap";

import ConfirmCard from "./ConfirmCard";
import MessageCard from "../messages/MessageCard";

import { getAppById } from "../../actions/teamAppActions";

const ConfirmLanding = ({ data, getAppById, errors }) => {
  console.log(errors);
  let card;
  useEffect(() => {
    const id = window.location.pathname.replace(/\/confirm\/team\//, "");
    getAppById(id);
  }, []);
  errors.appointment
    ? (card = (
        <MessageCard
          header="Something went wrong"
          body={errors.appointment}
          linkTo={true}
          url="/team"
          linkName="Team page"
        />
      ))
    : (card = <ConfirmCard data={data} />);
  return (
    <React.Fragment>
      <Row>
        <Col lg={{ size: 6, order: 2, offset: 3 }} className="mt-5 mb-3">
          <h5 className="text-center cus-text-light">
            PLease confirm the appointment.{" "}
          </h5>
        </Col>
      </Row>
      <Row>{card}</Row>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  data: state.teamAppointment.confirmAppointment,
  errors: state.errors
});

const mapDispatchToProps = {
  getAppById: getAppById
};

ConfirmLanding.propTypes = {
  data: PropTypes.object,
  getAppById: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmLanding);
