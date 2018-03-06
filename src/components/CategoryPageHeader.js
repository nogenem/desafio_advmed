import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Label, Input } from "reactstrap";

const CategoryPageHeader = ({
  filterValue,
  onFilterChange,
  numResultsValue,
  onShowChange
}) => (
  <FormGroup row>
    <Label for="filter-input" sm={2} md={2}>
      Filtro:
    </Label>
    <Col sm={10} md={6}>
      <Input
        type="text"
        name="filter"
        id="filter-input"
        value={filterValue}
        onChange={onFilterChange}
      />
    </Col>
    <Label for="show-input" sm={2} md={2} className="mt-sm-2 mt-md-0">
      Mostrar:
    </Label>
    <Col sm={10} md={2} className="mt-sm-2 mt-md-0">
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
  </FormGroup>
);

CategoryPageHeader.propTypes = {
  // ownProps
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  numResultsValue: PropTypes.number.isRequired,
  onShowChange: PropTypes.func.isRequired
};

export default CategoryPageHeader;
