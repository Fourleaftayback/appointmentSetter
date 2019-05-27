import React from "react";
import PropTypes from "prop-types";
import { Col, Card, CardTitle, CardBody, CardText, Badge } from "reactstrap";

const MessageCard = ({ header, body, linkTo, url, linkName }) => {
  return (
    <React.Fragment>
      <Col lg="6" className="m-auto">
        <Card className=" mt-5">
          <CardBody className="text-center">
            <CardTitle>{header}</CardTitle>
            <CardText>{body}</CardText>
            {linkTo ? (
              <Badge color="info" href={url} className="text-center">
                {linkName}
              </Badge>
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

MessageCard.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string,
  linkTo: PropTypes.bool.isRequired,
  url: PropTypes.string,
  linkName: PropTypes.string
};

export default MessageCard;
