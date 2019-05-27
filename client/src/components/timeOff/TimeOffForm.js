import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col, Button, Form, FormGroup, Input, Label } from "reactstrap";

import FormSelect from "../form/FormSelect";

import { setDaysOff } from "../../actions/daysOffActions";

import { setToMinute } from "../../controller/dataConverter";

const TimeOffForm = ({ date, setDaysOff }) => {
  const [repeatCount, setRepeatCount] = useState(2);
  const [repeat, setRepeat] = useState(false);

  const onSelect = e => {
    const indx = e.target.options.selectedIndex;
    setRepeatCount(e.target.options[indx].value);
  };
  const onChange = e => {
    e.target.checked ? setRepeat(true) : setRepeat(false);
  };

  const onSubmit = e => {
    const start = setToMinute(date, 4, 0);
    const end = setToMinute(date, 3, 59);
    let data = {
      appointment_start: start,
      appointment_end: end
    };
    if (!repeat) {
      setDaysOff("/daysoff/addone", data);
    } else {
      data.weeks = Number(repeatCount);
      setDaysOff("/daysoff/addmany", data);
    }
  };

  return (
    <React.Fragment>
      <Col md="6">
        <Form className="mt-2 text-center">
          <FormGroup check>
            <Input
              type="checkbox"
              name="repeat"
              id="repeat"
              onChange={onChange}
            />
            <Label for="repeat" check className="cus-text-light">
              Repeat Weekly
            </Label>
          </FormGroup>
          {repeat ? (
            <FormSelect
              onSelect={onSelect}
              label="How many weeks?"
              name="repeatCount"
              valueArr={[2, 3, 4, 5, 6, 7, 8]}
              nameArr={[2, 3, 4, 5, 6, 7, 8]}
              isLight={true}
              controlWidth={true}
            />
          ) : null}
          <Button color="primary" onClick={onSubmit} className="m-auto">
            Submit
          </Button>
        </Form>
      </Col>
    </React.Fragment>
  );
};

TimeOffForm.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

const mapDispatchToProps = {
  setDaysOff: setDaysOff
};

export default connect(
  null,
  mapDispatchToProps
)(TimeOffForm);
