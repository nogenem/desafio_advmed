import React from "react";
import PropTypes from "prop-types";
import { Media } from "reactstrap";

const VideoListItem = ({ video }) => (
  <Media tag="li" className="mb-3">
    <Media left href="#">
      <Media object src={video.thumbnails.medium} alt="Thumbnail do video." />
    </Media>
    <Media body>
      <Media heading tag="h5">
        {video.title}
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
  }).isRequired
};

export default VideoListItem;
