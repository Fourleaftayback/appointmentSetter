import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

import { firstUpperCase } from "../../controller/dataConverter";

const TeamMemberPicker = ({ teamMembers, firstUser, selectUser }) => {
  const filteredTeam = teamMembers
    .filter(item => firstUser.id !== item._id)
    .map(item => (
      <option key={item._id} value={item._id}>
        {firstUpperCase(item.first_name)}
      </option>
    ));

  return (
    <React.Fragment>
      <Form className="mx-4">
        <FormGroup>
          <Label for="teamMemberPicker" className="cus-text-light">
            Choose the Team Member
          </Label>
          <Input
            type="select"
            name="teamMemberPicker"
            id="teamMemberPicker"
            onChange={selectUser}>
            <option value={firstUser.id}>
              {firstUpperCase(firstUser.first_name)}
            </option>
            {filteredTeam}
          </Input>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

TeamMemberPicker.propTypes = {
  firstUser: PropTypes.object.isRequired,
  teamMembers: PropTypes.array.isRequired,
  selectUser: PropTypes.func.isRequired
};

export default TeamMemberPicker;
