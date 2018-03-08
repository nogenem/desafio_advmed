import React, { Component } from "react";
import PropTypes from "prop-types";
import { Media } from "reactstrap";
import queryString from "query-string";
import { withRouter } from "react-router";

import { ListItem } from "../video";
import ListPagination from "../ListPagination";

const smoothScroll = () => {
  const currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
};

class CategoryPageList extends Component {
  constructor(props) {
    super(props);

    const size = Math.ceil(props.videos.length / props.numResults);
    this.state = {
      size,
      index: this.getCurrentIndexFromLocation(props, size)
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({ index: this.getCurrentIndexFromLocation(nextProps) });
      smoothScroll();
    }

    if (
      this.props.videos.length !== nextProps.videos.length ||
      this.props.numResults !== nextProps.numResults
    ) {
      const size = Math.ceil(nextProps.videos.length / nextProps.numResults);
      this.props.history.push("?page=1");
      this.setState({ index: 1, size });
    }
  };

  shouldComponentUpdate = nextProps =>
    this.props.videos !== nextProps.videos ||
    this.props.numResults !== nextProps.numResults ||
    this.props.location.search !== nextProps.location.search;

  getPaginatedVideos = () => {
    const { videos, numResults } = this.props;
    const begin = (this.state.index - 1) * numResults;
    const { categoryId } = this.props.match.params;
    return videos
      .slice(begin, begin + numResults)
      .map(video => (
        <ListItem
          key={video.id}
          video={video}
          url={`/categories/${categoryId}/videos/${video.id}`}
        />
      ));
  };

  getCurrentIndexFromLocation = (props, size = this.state.size) => {
    const qObj = queryString.parse(props.location.search);
    let index = +qObj.page;
    if (!index || index < 1 || index > size) index = 1;
    return index;
  };

  render() {
    return (
      <React.Fragment>
        <Media list className="list-unstyled col-12">
          {this.getPaginatedVideos()}
        </Media>
        <ListPagination
          size={this.state.size}
          currentIndex={this.state.index}
        />
      </React.Fragment>
    );
  }
}

CategoryPageList.propTypes = {
  // ownProps
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
  numResults: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string
    }).isRequired
  }).isRequired
};

export default withRouter(CategoryPageList);
