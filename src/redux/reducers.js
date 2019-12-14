import { combineReducers } from 'redux';

import AccountReducer from './account/reducers';
import CakeReducer from './cake/reducers';
import CategoryReducer from './category/reducers';
import CartReducer from './cart/reducers';


export default combineReducers({
  ...AccountReducer,
  ...CakeReducer,
  ...CategoryReducer,
  ...CartReducer
});
