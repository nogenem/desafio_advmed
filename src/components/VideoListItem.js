/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Media } from "reactstrap";
import { Link } from "react-router-dom";

import LazyLoadedImg from "./LazyLoadedImg";

const VideoListItem = ({ video, url }) => (
  <Media tag="li" className="mb-3">
    <Media left tag="div">
      <LazyLoadedImg
        src={video.thumbnails.medium}
        alt="Thumbnail do video."
        className="media-object"
      />
    </Media>
    <Media body>
      <Media heading tag="h5">
        <Link to={url}>{video.title}</Link>
      </Media>
      <p className="text-muted">{video.short_description}</p>
    </Media>
  </Media>
);

VideoListItem.propTypes = {
  // ownProps
  video: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    short_description: PropTypes.string,
    thumbnails: PropTypes.shape({
      medium: PropTypes.string
    })
  }).isRequired,
  url: PropTypes.string.isRequired
};

export default VideoListItem;
