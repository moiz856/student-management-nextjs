import api from "@/lib/api";
import { Student } from "@/models/Student";

export const getStudents = async () => {
  const response = await api.get("/Student/all");
  return response.data;
};

export const createStudent = async (student: Student) => {
  const response = await api.post("/Student/create", student);
  console.log("Create Response:", response.data);
  return response.data;
};

export const getStudent = async (id: number) => {
  const response = await api.get(`/Student/${id}`);
  return response.data;
};

export const updateStudent = async (id: number, student: Student) => {
  console.log("Updating Student:", student);

  const response = await api.put(`/Student/update/${id}`, student);

  console.log("Update Response:", response.data);

  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/Student/delete/${id}`);
  console.log("Delete Response:", response.data);
  return response.data;
};
export const getDeletedStudents = async () => {
  const response = await api.get("/Student/deleted");
  return response.data;
};


export const restoreStudent = async (id:number) => {
  return await api.put(`/Student/restore/${id}`);
};
