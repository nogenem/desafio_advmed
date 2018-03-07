import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Label, Input } from "reactstrap";

const CategoryPageHeader = ({
  filterValue,
  onFilterChange,
  numResultsValue,
  onShowChange,
  videosLength
}) => (
  <React.Fragment>
    <FormGroup row id="filter-row">
      <Label for="filter-input" sm={2}>
        Filtro:
      </Label>
      <Col sm={10}>
        <Input
          type="text"
          name="filter"
          id="filter-input"
          placeholder="Filtre a lista de resultados..."
          value={filterValue}
          onChange={onFilterChange}
        />
      </Col>
    </FormGroup>
    <FormGroup
      row
      id="num-results-row"
      className="d-flex justify-content-center align-items-center"
      style={{ fontWeight: 500 }}
    >
      <Col xs="auto">Encontrados {videosLength} resultados. Com</Col>
      <Col xs="auto">
        <Input
          type="select"
          name="num_results"
          id="show-input"
          value={numResultsValue}
          onChange={onShowChange}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </Input>
      </Col>
      <Col xs="auto">resultados por página.</Col>
    </FormGroup>
  </React.Fragment>
);

CategoryPageHeader.propTypes = {
  // ownProps
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  numResultsValue: PropTypes.number.isRequired,
  onShowChange: PropTypes.func.isRequired,
  videosLength: PropTypes.number.isRequired
};

export default CategoryPageHeader;
