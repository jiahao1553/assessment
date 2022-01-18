import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { employeeReducer } from "./employee/reducer";
import { employeeSaga } from "./employee/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(employeeReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(employeeSaga);
