import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
// Style
// import styles from "./styles";
// Redux
import { connect } from "react-redux";
// Component
import ComponentPage from "./Component";

class ContainerPage extends Component {

  render() {
    return <ComponentPage {...this.props} />;
  }
}

const mapActionToProps = {};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ContainerPage));