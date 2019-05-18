import React, { useState } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import InfiniteCalendar from "react-infinite-calendar";

import TimeOffForm from "./TimeOffForm";

const TimeOffLanding = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const changeDate = date => {
    setSelectedDate(date);
  };
  const threeMonthes = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );
  return (
    <React.Fragment>
      <Row className="mt-5">
        <Col md={{ size: 4, offset: 1 }}>
          <InfiniteCalendar
            selected={selectedDate}
            minDate={today}
            maxDate={threeMonthes}
            width={350}
            height={250}
            displayOptions={{
              overscanMonthCount: 3
            }}
            onSelect={changeDate}
          />
        </Col>
        <TimeOffForm date={selectedDate} />
      </Row>
    </React.Fragment>
  );
};

TimeOffLanding.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeOffLanding);
