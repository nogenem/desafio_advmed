import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import categories from "../../constants/categories";

class TopNavigation extends Component {
  state = {
    isOpen: false
  };

  hideMenu = () => {
    this.setState({ isOpen: false });
  };

  toggleNavbar = () => {
    this.setState(oldState => ({
      isOpen: !oldState.isOpen
    }));
  };

  render() {
    return (
      <Navbar color="dark" dark>
        <NavbarBrand tag={Link} to="/" onClick={this.hideMenu}>
          Youtube API
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggleNavbar}
          aria-label="alternador do menu"
          aria-expanded={this.state.isOpen}
          aria-controls="collapseMenu"
        />
        <Collapse isOpen={this.state.isOpen} navbar id="collapseMenu">
          <Nav navbar>
            {Object.values(categories).map(category => (
              <NavItem key={category.id}>
                <NavLink
                  tag={Link}
                  to={`/categories/${category.id}`}
                  onClick={this.hideMenu}
                >
                  {category.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default TopNavigation;
