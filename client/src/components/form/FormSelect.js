import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

//must wrap component around <form></form> tag

const FormSelect = ({ onSelect, label, name, valueArr, nameArr }) => {
  let choices = valueArr.map((item, i) => (
    <option value={item} key={i}>
      {nameArr[i]}
    </option>
  ));
  return (
    <React.Fragment>
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Input type="select" name={name} id={name} onChange={onSelect}>
          {choices}
        </Input>
      </FormGroup>
    </React.Fragment>
  );
};

FormSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  valueArr: PropTypes.array.isRequired,
  nameArr: PropTypes.array.isRequired
};

export default FormSelect;
