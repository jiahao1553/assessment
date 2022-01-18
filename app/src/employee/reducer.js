import { ADD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, LOAD_EMPLOYEES, LOAD_EMPLOYEES_FAILED, LOAD_EMPLOYEES_SUCCEED } from "./actions";

export const EMPLOYEES = "employees";
const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const employeeReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOAD_EMPLOYEES:
      return { ...state, loading: true };

    case LOAD_EMPLOYEES_SUCCEED:
      window.localStorage.setItem(EMPLOYEES, JSON.stringify(action.payload));
      return { ...state, loading: false, data: action.payload };

    case LOAD_EMPLOYEES_FAILED:
      return { ...state, loading: false, error: action.payload };

    case ADD_EMPLOYEE:
      const beforeAddEmployees = JSON.parse(window.localStorage.getItem(EMPLOYEES));
      const afterAddEmployees = beforeAddEmployees.concat({
        ...action.payload,
        id: (
          Math.max.apply(
            Math,
            beforeAddEmployees.map((e) => Number(e.id))
          ) + 1
        ).toString(),
      });
      window.localStorage.setItem(EMPLOYEES, JSON.stringify(afterAddEmployees));
      return { ...state, loading: false, data: afterAddEmployees };

    case EDIT_EMPLOYEE:
      let beforeEditEmployees = JSON.parse(window.localStorage.getItem(EMPLOYEES));
      const editingIndex = beforeEditEmployees.findIndex((e) => e.id === action.payload.id);
      let afterEditEmployees = [];
      if (editingIndex > -1) {
        afterEditEmployees = [...beforeEditEmployees.slice(0, editingIndex - 1), action.payload, ...beforeEditEmployees.slice(editingIndex + 1)];
      } else {
        afterEditEmployees = beforeEditEmployees.concat(action.payload);
      }
      window.localStorage.setItem(EMPLOYEES, JSON.stringify(afterEditEmployees));
      return { ...state, loading: false, data: afterEditEmployees };

    case DELETE_EMPLOYEE:
      let beforeDeleteEmployees = JSON.parse(window.localStorage.getItem(EMPLOYEES));
      const afterDeleteEmployees = [...beforeDeleteEmployees.filter((e) => e.id !== action.payload.id)];
      window.localStorage.setItem(EMPLOYEES, JSON.stringify(afterDeleteEmployees));
      return { ...state, loading: false, data: afterDeleteEmployees };

    default:
      return state;
  }
};
