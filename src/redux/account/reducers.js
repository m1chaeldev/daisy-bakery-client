import update from 'immutability-helper';

import Actions from './actions';
import { createReducer } from '../../utils/redux';

const initialState = {
  user: {
    token: undefined,
    data: {
      _id: '',
      id: '',
      name: '',
      phone: '',
      address: '',
      level: 'Customer'
    },
    isFetching: false
  }
};

const reducer = [
  {
    on: Actions.getUserRequest,
    handler: state =>
      update(state, {
        user: {
          isFetching: {
            $set: true
          }
        }
      })
  },
  {
    on: Actions.getUserFailure,
    handler: state =>
      update(state, {
        user: {
          isFetching: {
            $set: false
          }
        }
      })
  },
  {
    on: Actions.getUserSuccess,
    handler: (state, action) => {
      const data = action.payload;
      return update(state, {
        user: {
          isFetching: {
            $set: false
          },
          data: {
            $set: {
              ...data, level:
                data.id === '1975267912618702' ? 'Admin' : 'Customer'
            }
          }
        }
      });
    }
  },
  {
    on: Actions.logoutRequest,
    handler: () => {
      window.location.replace('/');
    }
  }
];

export default createReducer('account', reducer, initialState);
