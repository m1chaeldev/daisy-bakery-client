/* eslint-disable */
import { flatten, reduce } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions as handleReduxActions } from 'redux-actions';

export function handleActions(actions: Array, initialState: Object) {
	return handleReduxActions(
		reduce(
			actions,
			(reducer, handler, action) => {
				reducer[action] = (state, act) => handler(state.set('action', action), act);
				return reducer;
			},
			{},
		),
		initialState,
	);
}

export function createReducer(name: String, reducer: Array, initialState: Object) {
	return {
		[name]: handleReduxActions(
			reduce(
				flatten(reducer),
				(reducer, action) => {
					reducer[action.on] = action.handler;
					return reducer;
				},
				{},
			),
			initialState,
		),
	};
}

export function createSaga(sagas: Array) {
	return flatten(sagas).map(
		saga =>
			function* handleTake() {
				yield takeLatest(saga.on, saga.handler);
			},
	);
}

export function createSingleAction(type: String) {
	const action = createAction(type);
	action.is = actionType => action.toString() === actionType;
	return action;
}

export function createAsyncAction(name: String, type: String) {
	return {
		[`${name}Request`]: createSingleAction(`${type}_REQUEST`),
		[`${name}Success`]: createSingleAction(`${type}_SUCCESS`),
		[`${name}Failure`]: createSingleAction(`${type}_FAILURE`),
	};
}
