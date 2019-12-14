import update from 'immutability-helper';

import Actions from './actions';
import { createReducer } from '../../utils/redux';

const initialState = {
  cake: {
    data: undefined,
    isFetching: false
  }
};

const reducer = [
  {
    on: Actions.getAllCakesRequest,
    handler: state =>
      update(state, {
        cake: {
          isFetching: {
            $set: true
          }
        }
      })
  },
  {
    on: Actions.getAllCakesFailure,
    handler: state =>
      update(state, {
        cake: {
          isFetching: {
            $set: false
          }
        }
      })
  },
  {
    on: Actions.getAllCakesSuccess,
    handler: (state, action) => {
      const data = action.payload;
      return update(state, {
        cake: {
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
