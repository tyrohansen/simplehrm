import axiosAPI from "./axiosApi";

export async function createDepartment(payload) {
    const response = await axiosAPI.post("departments/", payload);
    return response;
  }

export async function fetchDepartments(params = {}) {
  const response = await axiosAPI.get("departments/", { params: params });
  return response;
}

export async function fetchDepartmentById(id) {
  const response = await axiosAPI.get(`departments/${id}`);
  return response;
}

export async function deleteDepartmentById(id) {
    const response = await axiosAPI.delete(`departments/${id}/`);
    return response;
  }