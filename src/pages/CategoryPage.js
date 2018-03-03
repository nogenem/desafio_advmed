import React, { Component } from "react";
import PropTypes from "prop-types";

class CategoryPage extends Component {
  render() {
    const { categoryId } = this.props.match.params;
    return <div>CategoryId: {categoryId}</div>;
  }
}

CategoryPage.propTypes = {
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string
    }).isRequired
  }).isRequired
};

export default CategoryPage;
