import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [];
if (process.env.NODE_ENV === 'development') middleware.push(logger);

const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware, ...middleware)));

rootSaga.map(saga => sagaMiddleware.run(saga));

export default store;
