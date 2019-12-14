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
    }
  } catch (err) {
    yield put(Actions.getAllCategoriesFailure());
    yield console.log(err);
  }
}


function* watchGetAllCategoriesRequest() {
  yield takeLatest(Actions.getAllCategoriesRequest, handleGetAllCategories);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCategoriesRequest),
    // fork(watchLoginRequest)
  ]);
}
