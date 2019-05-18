import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col, Button, Form, FormGroup, Input, Label } from "reactstrap";

import FormSelect from "../form/FormSelect";

import { setDaysOff } from "../../actions/daysOffActions";

import { setTime } from "../../controller/dataConverter";

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
    const start = setTime(date, 4, 0);
    const end = setTime(date, 3, 59);
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
      <Col md={{ size: 4, offset: 2 }}>
        <Form>
          <FormGroup check className="">
            <Input
              type="checkbox"
              name="repeat"
              id="repeat"
              onChange={onChange}
            />
            <Label for="repeat" check>
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
