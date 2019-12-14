import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const {
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
} = createAsyncAction('getAllCarts', CONSTANTS.GET_ALL_CARTS);

export default {
    getAllCartsRequest,
    getAllCartsSuccess,
    getAllCartsFailure
};