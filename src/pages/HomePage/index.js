/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./mediaPrint.css";

import categories from "../../constants/categories";

class HomePage extends Component {
  render() {
    return (
      <Container className="text-center mt-5">
        <Row>
          <Col xs="12" sm="8" md="6" className="mx-auto">
            <ListGroup aria-label="escolha uma categoria">
              <ListGroupItem active color="dark">
                <h5 className="mb-0">Escolha uma categoria</h5>
              </ListGroupItem>
              {Object.values(categories).map(category => (
                <ListGroupItem key={category.id} action>
                  <Link
                    to={`/categories/${category.id}`}
                    style={{ fontWeight: "500" }}
                  >
                    {category.title}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
