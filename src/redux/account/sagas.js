import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import Actions from './actions';
import APIs from './apis';

function* handleLogin(action) {
  try {
    const data = action.payload;
    const res = yield call(APIs.login, data);
    if (res.success && res.result) {
      yield put(Actions.loginSuccess({ token: res.result.jwt }));
      yield localStorage.setItem('token', res.result.jwt);
      yield window.location.reload();
    } else {
      message.error('Login failure');
      yield put(Actions.loginFailure());
    }
  } catch (err) {
    message.error('Login failure');
    yield put(Actions.loginFailure());
    yield console.log(err);
  }
}

function* sagas() {
  yield takeLatest(Actions.loginRequest, handleLogin);
}

export default sagas;
