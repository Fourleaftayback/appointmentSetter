import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row } from "reactstrap";

import MyAppointment from "./MyAppointment";

const MyAppContainer = ({ myAppointments }) => {
  let appointments = myAppointments.map(item => (
    <MyAppointment key={item._id} data={item} />
  ));
  return (
    <React.Fragment>
      <Row>{appointments}</Row>
    </React.Fragment>
  );
};

MyAppContainer.propTypes = {
  myAppointments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  myAppointments: state.clientAppointment.userOnlySched
});

export default connect(
  mapStateToProps,
  null
)(MyAppContainer);
