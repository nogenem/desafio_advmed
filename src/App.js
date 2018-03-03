import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.css";

import { HomePage, CategoryPage } from "./pages";

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <Route location={location} path="/" exact component={HomePage} />
        <Route
          location={location}
          path="/categories/:categoryId"
          component={CategoryPage}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default App;
