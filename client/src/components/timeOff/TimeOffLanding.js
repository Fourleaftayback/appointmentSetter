import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import InfiniteCalendar from "react-infinite-calendar";

import TimeOffForm from "./TimeOffForm";
import TimeOffCard from "./TimeOffCard";

import { getAllDaysOff } from "../../actions/daysOffActions";

import { setToMinute } from "../../controller/dataConverter";

const TimeOffLanding = ({ getAllDaysOff, daysOff }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [today] = useState(new Date());
  let message, cards;
  const changeDate = date => {
    setSelectedDate(date);
  };
  const threeMonthes = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );

  useEffect(() => {
    getAllDaysOff();
  }, []);

  daysOff.length === 0
    ? (message = "You have not set any days off.")
    : (message = "Your Days Off");

  cards = daysOff.map(item => <TimeOffCard key={item._id} data={item} />);
  return (
    <React.Fragment>
      <Row className="mt-5">
        <Col md="6">
          <InfiniteCalendar
            selected={selectedDate}
            minDate={today}
            maxDate={threeMonthes}
            disabledDates={daysOff.map(item =>
              setToMinute(item.appointment_start, 0, 0)
            )}
            width={"100%"}
            height={300}
            displayOptions={{
              overscanMonthCount: 3
            }}
            onSelect={changeDate}
            theme={{
              disabledColor: "rgb(127, 95, 251)"
            }}
          />
        </Col>
        <TimeOffForm date={selectedDate} />
      </Row>
      <Row className="my-4">
        <Col md="6" className="m-auto">
          <h5 className="text-center cus-text-light">{message}</h5>
        </Col>
      </Row>
      <Row>{cards}</Row>
    </React.Fragment>
  );
};

TimeOffLanding.propTypes = {
  getAllDaysOff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  daysOff: state.teamAppointment.daysOff
});

const mapDispatchToProps = {
  getAllDaysOff: getAllDaysOff
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeOffLanding);
