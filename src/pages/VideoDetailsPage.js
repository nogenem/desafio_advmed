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
  CardTitle,
  Alert
} from "reactstrap";

import { getVideoById, isCategoryLoaded } from "../reducers/videos";
import { fetchVideoById } from "../actions/videos";
import VideoDescription from "../components/VideoDescription";
import VideoStatistics from "../components/VideoStatistics";
import handleErrors from "../utils/handleErrors";
import LoadingAlert from "../components/LoadingAlert";

class VideoDetailsPage extends Component {
  state = {
    loading: false,
    error: ""
  };

  componentDidMount = () => {
    const { categoryId, videoId } = this.props.match.params;
    if (this.props.isCategoryLoaded && !this.props.video.full_description) {
      this.loadData(categoryId, videoId);
    }
  };

  componentWillUpdate = nextProps => {
    const { categoryId, videoId } = this.props.match.params;
    const {
      categoryId: nextCategoryId,
      videoId: nextVideoId
    } = nextProps.match.params;

    if (categoryId !== nextCategoryId || videoId !== nextVideoId) {
      this.loadData(nextCategoryId, nextVideoId);
    }
  };

  loadData = (categoryId, videoId) => {
    this.setState({ loading: true });
    this.props
      .fetchVideoById(categoryId, videoId)
      .then(() => {
        this.setState({ loading: false, error: "" });
      })
      .catch(err => {
        this.setState({ loading: false, error: handleErrors(err) });
      });
  };

  render() {
    const { video } = this.props;
    const { loading, error } = this.state;

    if (loading) return <LoadingAlert className="mt-3" />;
    if (error)
      return (
        <Alert color="danger" className="mt-3 text-center">
          {error}
        </Alert>
      );
    if (!video.full_description)
      return (
        <Alert color="danger" className="mt-3 text-center">
          Não foi possível encontrar o video solicitado!
        </Alert>
      );

    const thumbnail = video.thumbnails.high
      ? video.thumbnails.high
      : video.thumbnails.medium;
    return (
      <Container className="mt-2">
        <Row className="mb-lg-2">
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
    views: PropTypes.number,
    likes: PropTypes.number,
    dislikes: PropTypes.number
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
