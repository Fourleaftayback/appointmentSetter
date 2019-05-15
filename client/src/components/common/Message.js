import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "reactstrap";

const Message = ({ error, message }) => {
  return (
    <React.Fragment>
      <Row className="mt-2">
        <Col>
          <small
            className={classnames("text-center", {
              "text-danger": error,
              "text-primary": message
            })}>
            {message ? message : null}
            {error ? error : null}
          </small>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Message.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string
};

export default Message;
