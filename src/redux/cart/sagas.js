import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import Actions from './actions';
import APIs from './apis';

function* handleGetAllCarts(action) {
  try {
    const res = yield call(APIs.getAllCarts);
    if (res && res.message === 'OK') {
      yield put(Actions.getAllCartsSuccess(res.data));
    } else {
      yield put(Actions.getAllCartsFailure());
    }
  } catch (err) {
    yield put(Actions.getAllCartsFailure());
    yield console.log(err);
  }
}


function* watchGetAllCartsRequest() {
  yield takeLatest(Actions.getAllCartsRequest, handleGetAllCarts);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCartsRequest),
    // fork(watchLoginRequest)
  ]);
}
