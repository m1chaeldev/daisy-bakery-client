import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import Actions from './actions';
import APIs from './apis';

function* handleGetAllCategories(action) {
  try {
    const res = yield call(APIs.getAllCategories);
    const res2 = yield call(APIs.getAllChildCategories);
    if (res && res.message === 'OK' && res2 && res2.message === 'OK') {
      yield put(Actions.getAllCategoriesSuccess({ category: res.data, child: res2.data }));
    } else {
      yield put(Actions.getAllCategoriesFailure());
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.getAllCategoriesFailure());
    yield console.log(err);
  }
}


function* handleCreateCategory(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.createCategory, data);
    if (res && res.message === 'OK') {
      yield put(Actions.createCategorySuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.createCategoryFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.createCategoryFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleUpdateCategory(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.updateCategory, data);
    if (res && res.message === 'OK') {
      yield put(Actions.updateCategorySuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.updateCategoryFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.updateCategoryFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleDeleteCategory(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.deleteCategory, data);
    if (res && res.message === 'OK') {
      yield put(Actions.deleteCategorySuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.deleteCategoryFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.deleteCategoryFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleCreateCategoryChild(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.createCategoryChild, data);
    if (res && res.message === 'OK') {
      yield put(Actions.createCategoryChildSuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.createCategoryChildFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.createCategoryChildFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleUpdateCategoryChild(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.updateCategoryChild, data);
    if (res && res.message === 'OK') {
      yield put(Actions.updateCategoryChildSuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.updateCategoryChildFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.updateCategoryChildFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleDeleteCategoryChild(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.deleteCategoryChild, data);
    if (res && res.message === 'OK') {
      yield put(Actions.deleteCategoryChildSuccess());
      yield put(Actions.getAllCategoriesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.deleteCategoryChildFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.deleteCategoryChildFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* watchCategoryCRUD() {
  yield takeLatest(Actions.getAllCategoriesRequest, handleGetAllCategories);
  yield takeLatest(Actions.createCategoryRequest, handleCreateCategory);
  yield takeLatest(Actions.createCategoryChildRequest, handleCreateCategoryChild);
  yield takeLatest(Actions.updateCategoryRequest, handleUpdateCategory);
  yield takeLatest(Actions.updateCategoryChildRequest, handleUpdateCategoryChild);
  yield takeLatest(Actions.deleteCategoryRequest, handleDeleteCategory);
  yield takeLatest(Actions.deleteCategoryChildRequest, handleDeleteCategoryChild);
}

export default function* rootSaga() {
  yield all([
    fork(watchCategoryCRUD),
    // fork(watchLoginRequest)
  ]);
}
