import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Collapse,
  Button
} from "reactstrap";

import { getVideoById, isCategoryLoaded } from "../reducers/videos";
import { fetchVideoById } from "../actions/videos";

class VideoDetailsPage extends Component {
  state = {
    isOpen: false
  };

  componentDidMount = () => {
    const { categoryId, videoId } = this.props.match.params;
    if (this.props.isCategoryLoaded && !this.props.video.full_description) {
      this.props.fetchVideoById(categoryId, videoId);
    }
  };

  componentWillUpdate = nextProps => {
    const { categoryId, videoId } = this.props.match.params;
    const {
      categoryId: nextCategoryId,
      videoId: nextVideoId
    } = nextProps.match.params;

    if (categoryId !== nextCategoryId || videoId !== nextVideoId) {
      this.props.fetchVideoById(nextCategoryId, nextVideoId);
    }
  };

  toggleCollapse = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { video } = this.props;
    if (!video.full_description)
      return <div>Não foi possivel encontrar o video solicitado!</div>;
    const thumbnail = video.thumbnails.high
      ? video.thumbnails.high
      : video.thumbnails.medium;
    return (
      <Container className="mt-2">
        <Row>
          <Col xs="12" sm="10" md="8" className="offset-sm-1 offset-md-2">
            <Card>
              <a href={video.url} target="_blank">
                <CardImg
                  top
                  width="100%"
                  src={thumbnail}
                  alt="Thumbnail do video."
                />
              </a>
              <CardBody>
                <CardTitle>{video.title}</CardTitle>
                <Button onClick={this.toggleCollapse}>Descrição</Button>
                <Collapse isOpen={this.state.isOpen}>
                  <CardText style={{ whiteSpace: "pre-line" }}>
                    {video.full_description}
                  </CardText>
                </Collapse>
                <Row className="text-center mt-1">
                  <Col xs="4">
                    <h5 className="mb-0">{video.views}</h5>
                    <small>Views</small>
                  </Col>
                  <Col xs="4">
                    <h5 className="mb-0">{video.likes}</h5>
                    <small>Likes</small>
                  </Col>
                  <Col xs="4">
                    <h5 className="mb-0">{video.dislikes}</h5>
                    <small>Dislikes</small>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

VideoDetailsPage.propTypes = {
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
      videoId: PropTypes.string
    }).isRequired
  }).isRequired,
  // mapStateToProps
  video: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    full_description: PropTypes.string,
    thumbnails: PropTypes.shape({
      medium: PropTypes.string
    }),
    views_num: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    likes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dislikes: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  isCategoryLoaded: PropTypes.bool.isRequired,
  // mapDispatchToProps
  fetchVideoById: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { categoryId, videoId } = ownProps.match.params;
  return {
    video: getVideoById(state, categoryId, videoId),
    isCategoryLoaded: isCategoryLoaded(state, categoryId)
  };
};

export const UnconnectedVideoDetailsPage = VideoDetailsPage;
export default connect(mapStateToProps, { fetchVideoById })(VideoDetailsPage);
