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

function* handleCreateCake(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.createCake, data);
    if (res && res.message === 'OK') {
      yield put(Actions.createCakeSuccess());
      yield put(Actions.getAllCakesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.createCakeFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.createCakeFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleUpdateCake(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.updateCake, data);
    if (res && res.message === 'OK') {
      yield put(Actions.updateCakeSuccess());
      yield put(Actions.getAllCakesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.updateCakeFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.updateCakeFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* handleDeleteCake(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.deleteCake, data);
    if (res && res.message === 'OK') {
      yield put(Actions.deleteCakeSuccess());
      yield put(Actions.getAllCakesRequest());
      message.success('Thành công');
    } else {
      yield put(Actions.deleteCakeFailure());
      message.error('Thất bại');
      console.log(res.message === 'serverKey invalid' ? 'Key đâu?' : '');
    }
  } catch (err) {
    yield put(Actions.deleteCakeFailure());
    message.error('Thất bại');
    yield console.log(err);
  }
}

function* watchCategoryCRUD() {
  yield takeLatest(Actions.getAllCakesRequest, handleGetAllCakes);
  yield takeLatest(Actions.createCakeRequest, handleCreateCake);
  yield takeLatest(Actions.updateCakeRequest, handleUpdateCake);
  yield takeLatest(Actions.deleteCakeRequest, handleDeleteCake);
}

export default function* rootSaga() {
  yield all([
    fork(watchCategoryCRUD),
    // fork(watchLoginRequest)
  ]);
}
