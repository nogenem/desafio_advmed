import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Media } from "reactstrap";

import "./CategoryPage.css";
import { fetchByCategoryId } from "../actions/videos";
import { getByCategoryId } from "../reducers/videos";
import VideoListItem from "../components/VideoListItem";

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      videos: props.videos
    };
  }

  componentDidMount() {
    if (this.state.videos.length === 0) this.loadData(this.props);
  }

  componentWillReceiveProps = nextProps => {
    const { categoryId } = this.props.match.params;
    const { categoryId: nextCategoryId } = nextProps.match.params;

    if (categoryId !== nextCategoryId && nextProps.videos.length === 0) {
      this.loadData(nextProps);
    } else if (this.props.videos !== nextProps.videos) {
      this.setState({
        videos: nextProps.videos
      });
    }
  };

  loadData = props => {
    const { categoryId } = props.match.params;
    this.setState({ loading: true });
    this.props
      .fetchByCategoryId(categoryId)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.error("ERR: ", err);
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <Container className="mt-3">
        <Row>
          <Media list className="list-unstyled">
            {this.state.videos.map(video => (
              <VideoListItem key={video.id} video={video} />
            ))}
          </Media>
        </Row>
      </Container>
    );
  }
}

CategoryPage.propTypes = {
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string
    }).isRequired
  }).isRequired,
  // mapStateToProps
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      title: PropTypes.string,
      short_description: PropTypes.string,
      thumbnails: PropTypes.shape({
        medium: PropTypes.string
      })
    })
  ).isRequired,
  // mapDispatchToProps
  fetchByCategoryId: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  videos: getByCategoryId(state, ownProps.match.params.categoryId)
});

export const UnconnectedCategoryPage = CategoryPage;
export default connect(mapStateToProps, { fetchByCategoryId })(CategoryPage);
