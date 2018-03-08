import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

const VideoStatistics = ({ views, likes, dislikes }) => (
  <Row className="text-center mt-1">
    <Col xs="6" sm="4">
      <h5 className="mb-0">{views.toLocaleString()}</h5>
      <small>Views</small>
    </Col>
    <Col xs="6" sm="4">
      <h5 className="mb-0">{likes.toLocaleString()}</h5>
      <small>Likes</small>
    </Col>
    <Col xs="6" sm="4" className="offset-3 offset-sm-0">
      <h5 className="mb-0">{dislikes.toLocaleString()}</h5>
      <small>Dislikes</small>
    </Col>
  </Row>
);

VideoStatistics.propTypes = {
  // ownProps
  views: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired
};

export default VideoStatistics;
