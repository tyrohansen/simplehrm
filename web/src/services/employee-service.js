import axios from "axios";
import axiosAPI, {getBaseUrl} from "./axiosApi";

export async function createEmployee(payload) {
    const response = await axiosAPI.post("employees/", payload);
    return response;
  }

export async function fetchEmployees(params = {}) {
  const response = await axiosAPI.get("employees/", { params: params });
  return response;
}

export async function fetchEmployeeById(id) {
  const response = await axiosAPI.get(`employees/${id}`);
  return response;
}

export async function updateEmployeeById(id, data) {
  const response = await axiosAPI.put(`employees/${id}`, data);
  return response;
}

export async function uploadEmployeePhoto(id, data) {
  const response = await axios.post(getBaseUrl() + `employees/${id}/photo`, data);
  return response;
}

export async function deleteEmployeeById(id) {
    const response = await axiosAPI.delete(`employees/${id}/`);
    return response;
}

export async function fetchEmployeeSummaryReport() {
  const response = await axiosAPI.get(`report/employees`);
  return response;
}