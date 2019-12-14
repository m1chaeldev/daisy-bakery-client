import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const {
    getAllCakesRequest,
    getAllCakesSuccess,
    getAllCakesFailure
} = createAsyncAction('getAllCakes', CONSTANTS.GET_ALL_CAKES);

export default {
    getAllCakesRequest,
    getAllCakesSuccess,
    getAllCakesFailure
};
