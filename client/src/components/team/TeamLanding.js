import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button } from "reactstrap";

import { getAllTeamApp } from "../../actions/teamAppActions";

const TeamLanding = ({ getAllTeamApp }) => {
  useEffect(() => {
    getAllTeamApp();
  }, []);
  return (
    <React.Fragment>
      <Row className="text-center mt-4">
        <Col>
          <Button>test</Button>
        </Col>
        <Col>
          <Button>test</Button>
        </Col>
        <Col>
          <Button>test</Button>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col md="4"> Cards goes Here</Col>
        <Col md="4"> Cards goes Here</Col>
        <Col md="4"> Cards goes Here</Col>
      </Row>
    </React.Fragment>
  );
};

TeamLanding.propTypes = {
  user: PropTypes.object.isRequired,
  getAllTeamApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  getAllTeamApp: getAllTeamApp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamLanding);
