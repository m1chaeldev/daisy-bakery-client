import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const logoutRequest = createSingleAction(CONSTANTS.LOGOUT);
const { loginRequest, loginSuccess, loginFailure } = createAsyncAction(
  'login',
  CONSTANTS.LOGIN
);

export default {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
};
