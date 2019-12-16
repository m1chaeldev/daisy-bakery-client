import update from 'immutability-helper';

import Actions from './actions';
import { createReducer } from '../../utils/redux';

const initialState = {
  user: {
    token: undefined,
    data: {
      name: 'Thái Nguyễn',
      level: 'Admin'
    },
    status: false
  },
  login: {
    status: false
  }
};

const reducer = [
  {
    on: Actions.loginRequest,
    handler: state =>
      update(state, {
        login: {
          status: {
            $set: true
          }
        }
      })
  },
  {
    on: Actions.loginFailure,
    handler: state =>
      update(state, {
        login: {
          status: {
            $set: false
          }
        }
      })
  },
  {
    on: Actions.loginSuccess,
    handler: (state, action) => {
      const { token } = action.payload;
      return update(state, {
        login: {
          status: {
            $set: false
          }
        },
        user: {
          token: {
            $set: token
          }
        }
      });
    }
  },
  {
    on: Actions.logoutRequest,
    handler: () => {
      localStorage.clear();
      window.location.replace('/');
    }
  }
];

export default createReducer('account', reducer, initialState);
