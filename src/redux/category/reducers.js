import update from 'immutability-helper';

import Actions from './actions';
import { createReducer } from '../../utils/redux';

const initialState = {
  category: {
    data: undefined,
    child: undefined,
    isFetching: false
  }
};

const reducer = [
  {
    on: Actions.getAllCategoriesRequest,
    handler: state =>
      update(state, {
        category: {
          isFetching: {
            $set: true
          }
        }
      })
  },
  {
    on: Actions.getAllCategoriesFailure,
    handler: state =>
      update(state, {
        category: {
          isFetching: {
            $set: false
          }
        }
      })
  },
  {
    on: Actions.getAllCategoriesSuccess,
    handler: (state, action) => {
      const { category, child } = action.payload;
      return update(state, {
        category: {
          data: {
            $set: category
          },
          child: {
            $set: child
          },
          isFetching: {
            $set: false
          }
        }
      });
    }
  }
];

export default createReducer('category', reducer, initialState);
