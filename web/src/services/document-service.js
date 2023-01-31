import axios from "axios";
import axiosAPI, {getBaseUrl} from "./axiosApi";

export async function createDocument(payload) {
    const response = await axios.post(getBaseUrl() + "documents/", payload);
    return response;
}

export async function fetchDocuments(params = {}) {
  const response = await axiosAPI.get("documents/", { params: params });
  return response;
}

export async function fetchEmployeeDocuments(id) {
    const response = await axiosAPI.get(`documents/employee/${id}`);
    return response;
  }

export async function fetchDocumentById(id) {
  const response = await axiosAPI.get(`documents/${id}`);
  return response;
}

export async function deleteDocumentById(id) {
    const response = await axiosAPI.delete(`documents/${id}/`);
    return response;
  }