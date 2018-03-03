import React, { Component } from "react";
import PropTypes from "prop-types";

class CategoryPage extends Component {
  render() {
    const { categoryId } = this.props.match.params;
    return <div>CategoryId: {categoryId}</div>;
  }
}

CategoryPage.propTypes = {};

export default CategoryPage;
