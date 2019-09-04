import { all } from 'redux-saga/effects'
import watchExample from './example'
export default function* rootSaga() {
    yield all([
        watchExample(),
    ])
};