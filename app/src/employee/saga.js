import { fork } from "redux-saga/effects";
import { loadEmployeesWatcher } from "./loadEmployeesSaga";

export function* employeeSaga() {
  yield fork(loadEmployeesWatcher);
}
