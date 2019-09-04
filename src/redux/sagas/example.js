import { call, put, takeEvery } from 'redux-saga/effects'
import { getExample } from './../../utils/api/example';

function* fetchExample(action) {
    try {
        const id = 4;
        const form = {
            employee_name: "Thái đẹp trai",
            employee_salary: "500",
            employee_age: "18"
        }
        const response = yield call(getExample, id, form);
        return console.log(response.data);
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* example() {
    yield takeEvery("TANG_LEN", fetchExample);
}

export default example;