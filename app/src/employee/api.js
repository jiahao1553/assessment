import axios from "axios";

export const fetchEmployees = async () => {
  return axios("https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees");
};
