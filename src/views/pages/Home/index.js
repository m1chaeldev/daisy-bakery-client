import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Row, Spin, Icon } from 'antd';
// Style
// import styles from "./styles";
// Redux
import { connect } from "react-redux";
// Component
import ComponentPage from "./Component";
// Action
import CakeActions from "../../../redux/cake/actions"

class ContainerPage extends Component {

  componentDidMount = () => {
    const {
      getAllCakesRequest
    } = this.props;
    getAllCakesRequest();
  };

  render() {
    const { isFetchingCake } = this.props;
    return isFetchingCake ? (
      <Row
        style={{ height: '100vh' }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Spin
          indicator={
            <Icon
              type="loading"
              style={{ fontSize: 150, color: '#e85a4f' }}
              spin
            />
          }
        />
      </Row>
    ) : (
        <ComponentPage {...this.props} />
      );
  }
}

const mapActionToProps = {
  getAllCakesRequest: CakeActions.getAllCakesRequest,
};

const mapStateToProps = state => {
  return {
    cakeData: state.cake.cake.data,
    isFetchingCake: state.cake.cake.isFetching
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ContainerPage));