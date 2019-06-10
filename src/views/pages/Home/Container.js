import React, { Component, Fragment } from "react";
// Style
// import styles from "./styles";
// Redux
import { connect } from "react-redux";
// Component
import HomePage from "./Component";
// Action
import { examActions } from "../../../redux/actions"

class HomePageContainer extends Component {
  render() {
    return (
      <Fragment>
        <HomePage {...this.props} />
      </Fragment>
    );
  }
}

const mapActionToProps = {
  Tanglen: examActions.exampleTanglen,
  Giamxuong: examActions.exampleGiamxuong
};

const mapStateToProps = state => {
  return {
    data: state.exam.count,
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(HomePageContainer);