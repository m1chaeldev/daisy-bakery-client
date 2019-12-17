import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const updateUserCart = createSingleAction(CONSTANTS.UPDATE_USER_CART);

const {
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
} = createAsyncAction('getAllCarts', CONSTANTS.GET_ALL_CARTS);

const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure
} = createAsyncAction('createOrder', CONSTANTS.CREATE_ORDER);

const {
    updateOrderStatusRequest,
    updateOrderStatusSuccess,
    updateOrderStatusFailure
} = createAsyncAction('updateOrderStatus', CONSTANTS.UPDATE_ORDER_STATUS);

export default {
    updateOrderStatusRequest,
    updateOrderStatusSuccess,
    updateOrderStatusFailure,
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    updateUserCart,
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
};
