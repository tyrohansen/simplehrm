import axiosAPI from "./axiosApi";

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

export async function uploadEmployeePhoto(id, data) {
  const response = await axiosAPI.post(`employees/${id}`, data);
  return response;
}

export async function deleteEmployeeById(id) {
    const response = await axiosAPI.delete(`employees/${id}/`);
    return response;
}