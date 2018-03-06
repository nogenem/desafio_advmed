import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";

import "./CategoryPage.css";
import { fetchByCategoryId } from "../actions/videos";
import { getByCategoryId } from "../reducers/videos";
import CategoryPageHeader from "../components/CategoryPageHeader";
import CategoryPageList from "../components/CategoryPageList";

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      videos: props.videos,
      filter: "",
      numResults: 10
    };
  }

  componentDidMount() {
    if (this.state.videos.length === 0) this.loadData(this.props);
  }

  componentWillReceiveProps = nextProps => {
    const { categoryId } = this.props.match.params;
    const { categoryId: nextCategoryId } = nextProps.match.params;

    if (categoryId !== nextCategoryId) {
      if (nextProps.videos.length === 0) this.loadData(nextProps);
      this.setState({ filter: "", videos: nextProps.videos, numResults: 10 });
    } else if (this.props.videos !== nextProps.videos) {
      this.setState({
        videos: nextProps.videos
      });
    }
  };

  onFilterChange = e => {
    const { value } = e.target;
    if (value === "") {
      this.setState({
        filter: "",
        videos: this.props.videos
      });
      return;
    }
    const filteredVideos = this.props.videos.filter(video => {
      const txt = video.title + video.short_description;
      return txt.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ filter: e.target.value, videos: filteredVideos });
  };

  onShowChange = e => {
    this.setState({ numResults: +e.target.value });
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
    const { loading, videos, filter, numResults } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <Container className="mt-3">
        <CategoryPageHeader
          filterValue={filter}
          onFilterChange={this.onFilterChange}
          numResultsValue={numResults}
          onShowChange={this.onShowChange}
          videosLength={videos.length}
        />
        <Row>
          <CategoryPageList videos={videos} numResults={numResults} />
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
