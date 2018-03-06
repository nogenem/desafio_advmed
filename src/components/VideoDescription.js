import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardText, Collapse, Button } from "reactstrap";

class VideoDescription extends Component {
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
        <Button onClick={this.toggleCollapse} className="dropdown-toggle">
          Descrição
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <CardText style={{ whiteSpace: "pre-line" }}>
            {this.props.description}
          </CardText>
        </Collapse>
      </React.Fragment>
    );
  }
}

VideoDescription.propTypes = {
  // ownProps
  description: PropTypes.string.isRequired
};

export default VideoDescription;
