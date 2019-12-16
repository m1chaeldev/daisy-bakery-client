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
import CategoryActions from "../../../redux/category/actions"
import CartActions from "../../../redux/cart/actions"

class ContainerPage extends Component {

  componentDidMount = () => {
    const {
      getAllCakesRequest,
      getAllCartsRequest,
      getAllCategoriesRequest
    } = this.props;
    getAllCakesRequest();
    getAllCategoriesRequest();
    getAllCartsRequest();
  };

  render() {
    const { isFetchingCake, isFetchingCart, isFetchingCategory } = this.props;
    return isFetchingCake && isFetchingCart && isFetchingCategory ? (
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
  getAllCategoriesRequest: CategoryActions.getAllCategoriesRequest,
  getAllCartsRequest: CartActions.getAllCartsRequest,
  createCategoryRequest: CategoryActions.createCategoryRequest,
  createCategoryChildRequest: CategoryActions.createCategoryChildRequest,
  updateCategoryRequest: CategoryActions.updateCategoryRequest,
  updateCategoryChildRequest: CategoryActions.updateCategoryChildRequest,
  deleteCategoryRequest: CategoryActions.deleteCategoryRequest,
  deleteCategoryChildRequest: CategoryActions.deleteCategoryChildRequest,
  updateUserCart: CartActions.updateUserCart
};

const mapStateToProps = state => {
  return {
    cakeData: state.cake.cake.data,
    isFetchingCake: state.cake.cake.isFetching,
    categoryData: state.category.category,
    isFetchingCategory: state.category.category.isFetching,
    cartData: state.cart.cart.data,
    isFetchingCart: state.cart.cart.isFetching,
    cart: state.cart.userCart,
    user: state.account.user.data,
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ContainerPage));