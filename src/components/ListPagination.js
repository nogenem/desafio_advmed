import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";

class ListPagination extends Component {
  shouldComponentUpdate = nextProps =>
    this.props.currentIndex !== nextProps.currentIndex ||
    this.props.size !== nextProps.size;

  generateButtons = () => {
    const { size, currentIndex } = this.props;
    const btns = [];

    for (let i = 1; i <= size; i++) {
      btns.push(
        <PaginationItem key={i} active={i === currentIndex}>
          <PaginationLink tag={Link} to={`?page=${i}`}>
            <span className="sr-only">página </span>
            {i}
            {i === currentIndex && <span className="sr-only">(atual)</span>}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return btns;
  };

  render() {
    return (
      <Col xs={12} className="d-flex justify-content-center">
        <nav aria-label="Páginas dos resultados da busca">
          <Pagination>{this.generateButtons()}</Pagination>
        </nav>
      </Col>
    );
  }
}

ListPagination.propTypes = {
  // ownProps
  size: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired
};

export default ListPagination;
