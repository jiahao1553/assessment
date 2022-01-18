import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_EMPLOYEES, LoadEmployeesSucceed, LoadEmployeesFailed } from "./actions";
import { fetchEmployees } from "./api";
import { EMPLOYEES } from "./reducer";

export function* loadEmployeesWatcher() {
  yield takeLatest(LOAD_EMPLOYEES, loadEmployees);
}

function* loadEmployees() {
  try {
    let employees = [];
    if (window.localStorage.getItem(EMPLOYEES)) {
      employees = JSON.parse(window.localStorage.getItem(EMPLOYEES));
    } else {
      const employeesRes = yield call(fetchEmployees);
      employees = employeesRes.data;
    }
    yield put(LoadEmployeesSucceed(employees));
  } catch (error) {
    yield put(LoadEmployeesFailed(error));
  }
}
