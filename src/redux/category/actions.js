import * as CONSTANTS from './constants';
import {
    // createSingleAction,
    createAsyncAction
} from '../../utils/redux';

const {
    getAllCategoriesRequest,
    getAllCategoriesSuccess,
    getAllCategoriesFailure
} = createAsyncAction('getAllCategories', CONSTANTS.GET_ALL_CATEGORIES);

const {
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure
} = createAsyncAction('createCategory', CONSTANTS.CREATE_CATEGORY);

const {
    updateCategoryRequest,
    updateCategorySuccess,
    updateCategoryFailure
} = createAsyncAction('updateCategory', CONSTANTS.UPDATE_CATEGORY);

const {
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure
} = createAsyncAction('deleteCategory', CONSTANTS.DELETE_CATEGORY);

const {
    createCategoryChildRequest,
    createCategoryChildSuccess,
    createCategoryChildFailure
} = createAsyncAction('createCategoryChild', CONSTANTS.CREATE_CATEGORY_CHILD);

const {
    updateCategoryChildRequest,
    updateCategoryChildSuccess,
    updateCategoryChildFailure
} = createAsyncAction('updateCategoryChild', CONSTANTS.UPDATE_CATEGORY_CHILD);

const {
    deleteCategoryChildRequest,
    deleteCategoryChildSuccess,
    deleteCategoryChildFailure
} = createAsyncAction('deleteCategoryChild', CONSTANTS.DELETE_CATEGORY_CHILD);

export default {
    createCategoryChildRequest,
    createCategoryChildSuccess,
    createCategoryChildFailure,
    updateCategoryChildRequest,
    updateCategoryChildSuccess,
    updateCategoryChildFailure,
    deleteCategoryChildRequest,
    deleteCategoryChildSuccess,
    deleteCategoryChildFailure,
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryRequest,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure,
    getAllCategoriesRequest,
    getAllCategoriesSuccess,
    getAllCategoriesFailure
};
