import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
// Style
// import styles from "./styles";
// Redux
import { connect } from "react-redux";
// Component
import ComponentPage from "./Component";
// Action
import * as AccountActions from "../../../redux/account/actions"

class ContainerPage extends Component {
  render() {
    return (
      <Fragment>
        <ComponentPage {...this.props} />
      </Fragment>
    );
  }
}

const mapActionToProps = {
  // Tanglen: AccountActions.exampleTanglen,
};

const mapStateToProps = state => {
  return {
    // data: state.exam.count,
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ContainerPage));