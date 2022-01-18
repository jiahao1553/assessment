export const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";
export const LOAD_EMPLOYEES_SUCCEED = "LOAD_EMPLOYEES_SUCCEED";
export const LOAD_EMPLOYEES_FAILED = "LOAD_EMPLOYEES_FAILED";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const loadEmployees = () => ({
  type: LOAD_EMPLOYEES,
});

export const LoadEmployeesSucceed = (employees) => ({
  type: LOAD_EMPLOYEES_SUCCEED,
  payload: employees,
});

export const LoadEmployeesFailed = (error) => ({
  type: LOAD_EMPLOYEES_FAILED,
  payload: error,
});

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const editEmployee = (employee) => ({
  type: EDIT_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (employee) => ({
  type: DELETE_EMPLOYEE,
  payload: employee,
});
