import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Label, Input } from "reactstrap";

const Header = ({
  filterValue,
  onFilterChange,
  numResultsOptions,
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
          aria-label="quantidade de resultados"
          value={numResultsValue}
          onChange={onShowChange}
        >
          {numResultsOptions.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Input>
      </Col>
      <Col xs="auto">resultados por página.</Col>
    </FormGroup>
  </React.Fragment>
);

Header.propTypes = {
  // ownProps
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  numResultsOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  numResultsValue: PropTypes.number.isRequired,
  onShowChange: PropTypes.func.isRequired,
  videosLength: PropTypes.number.isRequired
};

export default Header;
