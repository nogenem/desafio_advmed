import React, { Component } from "react";
import PropTypes from "prop-types";

import { spinner } from "../constants/base64_imgs";

const getImage = url =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      reject(url);
    };
    img.src = url;
    if (img.complete) resolve(url);
  });

class LazyLoadedImg extends Component {
  componentDidMount = () => {
    getImage(this.props.src)
      .then(url => {
        this.imgRef.src = url;
      })
      .catch(url => {
        console.log(`LazyLoadedImg:> Imagem falhou ao carregar: ${url}`);
        this.imgRef.src = "";
      });
  };

  getRef = e => {
    this.imgRef = e;
  };

  render() {
    const { alt, className } = this.props;
    return (
      <img src={spinner} alt={alt} ref={this.getRef} className={className} />
    );
  }
}

LazyLoadedImg.propTypes = {
  // ownProps
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

LazyLoadedImg.defaultProps = {
  className: ""
};

export default LazyLoadedImg;
