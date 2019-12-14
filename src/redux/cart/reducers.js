import update from 'immutability-helper';

import Actions from './actions';
import { createReducer } from '../../utils/redux';

const initialState = {
  cart: {
    data: undefined,
    isFetching: false
  }
};

const reducer = [
  {
    on: Actions.getAllCartsRequest,
    handler: state =>
      update(state, {
        cart: {
          isFetching: {
            $set: true
          }
        }
      })
  },
  {
    on: Actions.getAllCartsFailure,
    handler: state =>
      update(state, {
        cart: {
          isFetching: {
            $set: false
          }
        }
      })
  },
  {
    on: Actions.getAllCartsSuccess,
    handler: (state, action) => {
      const data = action.payload;
      return update(state, {
        cart: {
          data: {
            $set: data
          },
          isFetching: {
            $set: false
          }
        }
      });
    }
  }
];

export default createReducer('cart', reducer, initialState);
