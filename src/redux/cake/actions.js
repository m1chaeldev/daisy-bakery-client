import * as CONSTANTS from './constants';
import {
    // createSingleAction,
    createAsyncAction
} from '../../utils/redux';

const {
    getAllCakesRequest,
    getAllCakesSuccess,
    getAllCakesFailure
} = createAsyncAction('getAllCakes', CONSTANTS.GET_ALL_CAKES);

const {
    createCakeRequest,
    createCakeSuccess,
    createCakeFailure
} = createAsyncAction('createCake', CONSTANTS.CREATE_CAKE);

const {
    updateCakeRequest,
    updateCakeSuccess,
    updateCakeFailure
} = createAsyncAction('updateCake', CONSTANTS.UPDATE_CAKE);

const {
    deleteCakeRequest,
    deleteCakeSuccess,
    deleteCakeFailure
} = createAsyncAction('deleteCake', CONSTANTS.DELETE_CAKE);

export default {
    createCakeRequest,
    createCakeSuccess,
    createCakeFailure,
    updateCakeRequest,
    updateCakeSuccess,
    updateCakeFailure,
    deleteCakeRequest,
    deleteCakeSuccess,
    deleteCakeFailure,
    getAllCakesRequest,
    getAllCakesSuccess,
    getAllCakesFailure
};