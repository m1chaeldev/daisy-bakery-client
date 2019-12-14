import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import Actions from './actions';
import APIs from './apis';

function* handleGetAllCakes(action) {
  try {
    const res = yield call(APIs.getAllCakes);
    if (res && res.message === 'OK') {
      yield put(Actions.getAllCakesSuccess(res.data));
    } else {
      yield put(Actions.getAllCakesFailure());
    }
  } catch (err) {
    yield put(Actions.getAllCakesFailure());
    yield console.log(err);
  }
}


function* watchGetAllCakesRequest() {
  yield takeLatest(Actions.getAllCakesRequest, handleGetAllCakes);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCakesRequest),
    // fork(watchLoginRequest)
  ]);
}
