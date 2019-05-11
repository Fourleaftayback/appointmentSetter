import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

const TeamMemberPicker = ({ data }) => {
  return (
    <React.Fragment>
      <Form>
        <FormGroup>
          <Label for="teamMemberPicker">Choose the Team Member</Label>
          <Input
            type="select"
            name="teamMemberPicker"
            id="teamMemberPicker"
            onChange={() => console.log("doing something")}>
            {data.map(item => (
              <option value={item.name}>{item.name}</option>
            ))}
          </Input>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

TeamMemberPicker.propTypes = {
  // add function
  // array of teammember
  // currentTeam member
};

export default TeamMemberPicker;
