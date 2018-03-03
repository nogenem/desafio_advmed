import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import categories from "../constants/categories";

class HomePage extends Component {
  render() {
    return (
      <Container
        style={{ height: "calc(100% - 56px)" }}
        className="text-center"
      >
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "calc(100% - 56px)" }}
        >
          <Col xs="12" sm="8" md="6" className="mx-auto">
            <ListGroup>
              <ListGroupItem active>Escolha uma categoria</ListGroupItem>
              {Object.values(categories).map(category => (
                <ListGroupItem
                  key={category.id}
                  tag={Link}
                  to={`/categories/${category.id}`}
                >
                  {category.title}
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
