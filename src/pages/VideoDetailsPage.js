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
  CardTitle
} from "reactstrap";

import { getVideoById, isCategoryLoaded } from "../reducers/videos";
import { fetchVideoById } from "../actions/videos";
import VideoDescription from "../components/VideoDescription";
import VideoStatistics from "../components/VideoStatistics";

class VideoDetailsPage extends Component {
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
                <VideoDescription description={video.full_description} />
                <VideoStatistics
                  views={video.views}
                  likes={video.likes}
                  dislikes={video.dislikes}
                />
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
