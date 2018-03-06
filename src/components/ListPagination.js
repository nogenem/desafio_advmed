import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import queryString from "query-string";

class ListPagination extends Component {
  shouldComponentUpdate = nextProps =>
    this.props.currentIndex !== nextProps.currentIndex ||
    this.props.size !== nextProps.size;

  onClick = e => {
    const query = queryString.parse(this.props.location.search);
    query.page = +e.target.text;
    this.props.history.push(`?${queryString.stringify(query)}`);
  };

  generateButtons = () => {
    const { size, currentIndex } = this.props;
    const btns = [];

    for (let i = 1; i <= size; i++) {
      btns.push(
        <PaginationItem key={i} active={i === currentIndex}>
          <PaginationLink onClick={this.onClick}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return btns;
  };

  render() {
    return (
      <Col xs={12} className="d-flex justify-content-center">
        <Pagination>{this.generateButtons()}</Pagination>
      </Col>
    );
  }
}

ListPagination.propTypes = {
  // ownProps
  size: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(ListPagination);
