import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const updateUserCart = createSingleAction(CONSTANTS.UPDATE_USER_CART);

const {
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
} = createAsyncAction('getAllCarts', CONSTANTS.GET_ALL_CARTS);

export default {
    updateUserCart,
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
};
