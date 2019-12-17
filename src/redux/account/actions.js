import * as CONSTANTS from './constants';
import { createSingleAction, createAsyncAction } from '../../utils/redux';

const logoutRequest = createSingleAction(CONSTANTS.LOGOUT);

const { getUserRequest, getUserSuccess, getUserFailure } = createAsyncAction(
  'getUser',
  CONSTANTS.GET_USER
);

const { createUserRequest, createUserSuccess, createUserFailure } = createAsyncAction(
  'createUser',
  CONSTANTS.CREATE_USER
);

const { updateUserRequest, updateUserSuccess, updateUserFailure } = createAsyncAction(
  'updateUser',
  CONSTANTS.UPDATE_USER
);

const { blockUserRequest, blockUserSuccess, blockUserFailure } = createAsyncAction(
  'blockUser',
  CONSTANTS.BLOCK_USER
);

export default {
  blockUserRequest,
  blockUserSuccess,
  blockUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  logoutRequest
};
