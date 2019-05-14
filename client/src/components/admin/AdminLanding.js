import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import history from "../../history/History";

const AdminLanding = ({ user, isAdmin }) => {
  if (!isAdmin) history.push("/not-authorized");
  return (
    <React.Fragment>
      <Row>
        <Col>team management page</Col>
      </Row>
    </React.Fragment>
  );
};

AdminLanding.propTypes = {
  user: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAdmin: state.auth.user.isAdmin
});

export default connect(mapStateToProps)(AdminLanding);
