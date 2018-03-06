import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.css";

import { HomePage, CategoryPage, VideoDetailsPage } from "./pages";
import TopNavigation from "./components/navigation/TopNavigation";

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <TopNavigation />
        <Route location={location} path="/" exact component={HomePage} />
        <Route
          location={location}
          exact
          path="/categories/:categoryId"
          component={CategoryPage}
        />
        <Route
          location={location}
          path="/categories/:categoryId/videos/:videoId"
          component={VideoDetailsPage}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  // ownProps
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default App;
