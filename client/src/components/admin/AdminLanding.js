import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button } from "reactstrap";
import history from "../../history/History";

import { getAllTeamAdmin } from "../../actions/adminActions";

import TeamMemberCard from "./TeamMemberCard";

const AdminLanding = ({ user, isAdmin, getAllTeamAdmin, teamMembers }) => {
  if (!isAdmin) history.push("/not-authorized");

  useEffect(() => {
    getAllTeamAdmin();
  }, []);

  let teamCards = teamMembers
    .filter(item => item._id !== user.id)
    .map(team => <TeamMemberCard key={team._id} data={team} />);

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col md={{ size: 6, order: 2, offset: 0 }}>
          <Button outline color="primary">
            Invite New Member
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">{teamCards}</Row>
    </React.Fragment>
  );
};

AdminLanding.propTypes = {
  user: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  getAllTeamAdmin: PropTypes.func.isRequired,
  teamMembers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAdmin: state.auth.user.isAdmin,
  teamMembers: state.admin.allTeam
});

const mapDispatchToProps = { getAllTeamAdmin: getAllTeamAdmin };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLanding);
