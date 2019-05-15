import React, { useState } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

import FormSelect from "../form/FormSelect";

import { createNewTeamMate } from "../../actions/adminActions";

const AddMemberInlineForm = ({ error, createNewTeamMate }) => {
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const selectIsAdmin = e => {
    const indx = e.target.options.selectedIndex;
    setIsAdmin(e.target.options[indx].value);
  };

  const onSubmit = () => {
    const newUser = {
      email: email,
      isAdmin: isAdmin
    };
    createNewTeamMate(newUser);
  };
  console.log(error);
  return (
    <React.Fragment>
      <Col md={{ size: 8, order: 2, offset: 2 }}>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
            <Label for="email" className="mr-sm-2">
              Email
            </Label>
            <Input
              className={classnames("form-control", {
                "is-invalid": error.email
              })}
              type="email"
              name="email"
              id="newMemberEmail"
              placeholder="example@email.com"
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormSelect
            label="isAdmin?"
            onSelect={selectIsAdmin}
            name="isAdmin"
            valueArr={[false, true]}
            nameArr={["No", "Yes"]}
            marginRight={true}
          />
          <Button color="primary" className="ml-3" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  error: state.errors
});

const mapDispatchToProps = {
  createNewTeamMate: createNewTeamMate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberInlineForm);
/* set up a response handler here on success   {error.email && <div className="invalid-feedback">{error.email}</div>} */
