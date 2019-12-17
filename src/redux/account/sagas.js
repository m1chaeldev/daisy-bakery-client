import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import Actions from './actions';
import APIs from './apis';

function* handleGetUser(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.getUser, data);
    if (res && res.message === 'OK') {
      if (res.data !== null) {
        yield put(Actions.getUserSuccess(res.data));
      } else {
        yield put(Actions.createUserRequest(data));
      }
    } else {
      yield put(Actions.getUserFailure());
    }
  } catch (err) {
    yield put(Actions.getUserFailure());
    yield console.log(err);
  }
}

function* handleCreateUser(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.createUser, data);
    if (res && res.message === 'OK') {
      yield put(Actions.createUserSuccess());
      yield put(Actions.getUserRequest(data));
    } else {
      yield put(Actions.createUserFailure());
    }
  } catch (err) {
    yield put(Actions.createUserFailure());
    yield console.log(err);
  }
}

function* handleUpdateUser(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.updateUser, data);
    if (res && res.message === 'OK') {
      yield put(Actions.updateUserSuccess());
      yield put(Actions.getUserRequest(data));
      message.success('Thành công');
    } else {
      yield put(Actions.updateUserFailure());
    }
  } catch (err) {
    yield put(Actions.updateUserFailure());
    yield console.log(err);
  }
}

function* handleBlockUser(action) {
  try {
    const data = action.payload;
    const user = yield call(APIs.getUser, data);
    if (user && user.message === 'OK' && user.data !== null) {
      const res = yield call(APIs.blockUser, { ...data, _id: user.data._id });
      if (res && res.message === 'OK') {
        yield put(Actions.blockUserSuccess());
        yield put(Actions.getUserRequest(data));
        alert(`Đã chặn khách hàng ${user.data.name}`);
      } else {
        yield put(Actions.blockUserFailure());
      }
    } else yield put(Actions.blockUserFailure());
  } catch (err) {
    yield put(Actions.blockUserFailure());
    yield console.log(err);
  }
}

function* watchAccountRequest() {
  yield takeLatest(Actions.getUserRequest, handleGetUser);
  yield takeLatest(Actions.createUserRequest, handleCreateUser);
  yield takeLatest(Actions.updateUserRequest, handleUpdateUser);
  yield takeLatest(Actions.blockUserRequest, handleBlockUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchAccountRequest),
    // fork(watchLoginRequest)
  ]);
}
