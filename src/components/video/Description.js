import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardText, Collapse, Button } from "reactstrap";

class Description extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState(prev => ({
      isOpen: !prev.isOpen
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.toggleCollapse}
          className="dropdown-toggle"
          aria-label="alternador da descrição do video"
          aria-expanded={this.state.isOpen}
          aria-controls="collapseDescription"
        >
          Descrição
        </Button>
        <Collapse isOpen={this.state.isOpen} id="collapseDescription">
          <CardText style={{ whiteSpace: "pre-line" }}>
            {this.props.description}
          </CardText>
        </Collapse>
      </React.Fragment>
    );
  }
}

Description.propTypes = {
  // ownProps
  description: PropTypes.string.isRequired
};

export default Description;
