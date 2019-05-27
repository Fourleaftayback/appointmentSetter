import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row } from "reactstrap";

import MyAppointment from "./MyAppointment";
import MessageCard from "../messages/MessageCard";

const MyAppContainer = ({ myAppointments }) => {
  let appointments = myAppointments.map(item => (
    <MyAppointment key={item._id} data={item} />
  ));
  return (
    <React.Fragment>
      <Row>
        {myAppointments.length === 0 ? (
          <MessageCard
            header="No up coming appointments."
            body="You do not have any scheduled appointments. Please go back to the home page and request one."
            linkTo={true}
            url="/"
            linkName="Home"
          />
        ) : (
          appointments
        )}
      </Row>
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
