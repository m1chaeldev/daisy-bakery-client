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

function* handleCreateOrder(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.createOrder, data);
    if (res && res.message === 'OK') {
      yield put(Actions.createOrderSuccess(res.data));
      yield put(Actions.getAllCartsRequest());
      message.success('Đặt bánh thành công! Vui lòng đợi nhân viên của Daisy Bakery trả lời')
    } else {
      yield put(Actions.createOrderFailure());
    }
  } catch (err) {
    yield put(Actions.createOrderFailure());
    yield console.log(err);
  }
}

function* handleUpdateOrderStatus(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.updateOrderStatus, data);
    if (res && res.message === 'OK') {
      yield put(Actions.updateOrderStatusSuccess());
      yield put(Actions.getAllCartsRequest());
    } else {
      yield put(Actions.updateOrderStatusFailure());
    }
  } catch (err) {
    yield put(Actions.updateOrderStatusFailure());
    yield console.log(err);
  }
}

function* watchGetAllCartsRequest() {
  yield takeLatest(Actions.getAllCartsRequest, handleGetAllCarts);
  yield takeLatest(Actions.createOrderRequest, handleCreateOrder);
  yield takeLatest(Actions.updateOrderStatusRequest, handleUpdateOrderStatus);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCartsRequest),
    // fork(watchUpdateUserCartRequest)
  ]);
}
