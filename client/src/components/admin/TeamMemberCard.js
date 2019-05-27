import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  NavLink,
  CardFooter
} from "reactstrap";

import DeleteTeamModal from "./DeleteTeamModal";

import { firstUpperCase } from "../../controller/dataConverter";

const TeamMemberCard = ({ data }) => {
  return (
    <React.Fragment>
      <Col md={6} className="mb-3">
        <Card>
          <CardHeader className="text-center">
            {firstUpperCase(data.first_name)} {firstUpperCase(data.last_name)}
          </CardHeader>
          <CardBody>
            <CardText>
              Phone: <NavLink href={"tel:" + data.phone}>{data.phone}</NavLink>
            </CardText>
            <CardText>
              Email:{" "}
              <NavLink href={"mailto:" + data.email}>{data.email}</NavLink>
            </CardText>
          </CardBody>
          <CardFooter>
            <DeleteTeamModal teamId={data._id} />
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

TeamMemberCard.propTypes = {
  data: PropTypes.object.isRequired
};

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(TeamMemberCard);
