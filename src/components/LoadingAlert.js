import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

import { spinner } from "../constants/base64_imgs";

const LoadingAlert = ({ className }) => (
  <Alert color="primary" className={`text-center ${className}`}>
    <img src={spinner} alt="spinner" />
    <div className="font-weight-bold">Carregando...</div>
  </Alert>
);

LoadingAlert.propTypes = {
  // ownProps
  className: PropTypes.string
};

LoadingAlert.defaultProps = {
  // ownProps
  className: ""
};

export default LoadingAlert;
