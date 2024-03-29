import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import classnames from "classnames";
//must wrap component around <form></form> tag

const FormSelect = ({
  onSelect,
  label,
  name,
  valueArr,
  nameArr,
  marginRight,
  isLight,
  controlWidth
}) => {
  let choices = valueArr.map((item, i) => (
    <option value={item} key={i}>
      {nameArr[i]}
    </option>
  ));
  return (
    <React.Fragment>
      <FormGroup
        className={classnames("admin-inline-form", {
          "control-width-select": controlWidth
        })}>
        <Label
          for={name}
          className={classnames({
            "mr-2": marginRight,
            "cus-text-light": isLight
          })}>
          {label}
        </Label>
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
  nameArr: PropTypes.array.isRequired,
  marginRight: PropTypes.bool,
  isLight: PropTypes.bool,
  controlWidth: PropTypes.bool
};

export default FormSelect;
