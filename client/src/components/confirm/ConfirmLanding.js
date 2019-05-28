import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col } from "reactstrap";

import ConfirmCard from "./ConfirmCard";

import { getAppById } from "../../actions/teamAppActions";

const ConfirmLanding = ({ data, userId, getAppById }) => {
  useEffect(() => {
    const id = window.location.pathname.replace(/\/confirm\/team\//, "");
    getAppById(id);
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={{ size: 6, order: 2, offset: 3 }} className="mt-5 mb-3">
          <h5 className="text-center cus-text-light">
            PLease confirm the appointment.{" "}
          </h5>
        </Col>
      </Row>
      <Row>
        <ConfirmCard data={data} owner={userId} />
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  data: state.teamAppointment.confirmAppointment
});

const mapDispatchToProps = {
  getAppById: getAppById
};

ConfirmLanding.propTypes = {
  data: PropTypes.object,
  userId: PropTypes.string,
  getAppById: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmLanding);
