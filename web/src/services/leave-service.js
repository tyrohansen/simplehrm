import axiosAPI from "./axiosApi";

export async function createLeaveRequest(payload) {
    const response = await axiosAPI.post("leave_requests/", payload);
    return response;
  }

export async function fetchLeaveRequests(params = {}) {
  const response = await axiosAPI.get("leave_requests/", { params: params });
  return response;
}

export async function fetchEmployeeLeaveRequests(id) {
    const response = await axiosAPI.get(`leave_requests/employee/${id}`);
    return response;
  }

export async function fetchLeaveRequestById(id) {
  const response = await axiosAPI.get(`leave_requests/${id}`);
  return response;
}

export async function deleteLeaveRequestById(id) {
    const response = await axiosAPI.delete(`leave_requests/${id}/`);
    return response;
  }

  export async function fetchLeaveSummaryReport() {
    const response = await axiosAPI.get(`report/leave_requests`);
    return response;
  }