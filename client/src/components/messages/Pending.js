import React, { Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Badge } from "reactstrap";

import DefaultMessage from "./DefaultMessage";
const JustMade = React.lazy(() => import("./JustMade"));

const Pending = ({ appJustMade }) => {
  return (
    <React.Fragment>
      {Object.keys(appJustMade).length === 0 ? (
        <DefaultMessage />
      ) : (
        <Suspense
          fallback={<div className="text-center">Something went wrong...</div>}>
          <JustMade appJustMade={appJustMade} />
        </Suspense>
      )}
      <Row>
        <Col>
          <h3 className="text-center mt-3">
            <Badge href="/" color="info">
              Home
            </Badge>
          </h3>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Pending.propTypes = {
  appJustMade: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  appJustMade: state.clientAppointment.appJustMade
});

export default connect(
  mapStateToProps,
  null
)(Pending);
