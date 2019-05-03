import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

const TeamLanding = () => {
  return (
    <Container>
      <p> Dummy text for Team Landing</p>
    </Container>
  );
};

TeamLanding.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(TeamLanding);
