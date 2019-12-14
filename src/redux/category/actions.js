import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const {
    getAllCategoriesRequest,
    getAllCategoriesSuccess,
    getAllCategoriesFailure
} = createAsyncAction('getAllCategories', CONSTANTS.GET_ALL_CATEGORIES);

export default {
    getAllCategoriesRequest,
    getAllCategoriesSuccess,
    getAllCategoriesFailure
};
