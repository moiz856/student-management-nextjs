"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getStudents,
  deleteStudent,
  getDeletedStudents,
  restoreStudent,
} from "@/services/studentService";

import { Student } from "@/models/Student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [deletedStudents, setDeletedStudents] = useState<Student[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const activeStudents = await getStudents();
      const deleted = await getDeletedStudents();

      setStudents(activeStudents);
      setDeletedStudents(deleted);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE STUDENT
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteStudent(id);

      alert("Student Deleted Successfully");

      loadStudents();
    } catch (error) {
      console.error("Delete Error:", error);

      alert("Error while deleting student");
    }
  };

  // RESTORE STUDENT
  const handleRestore = async (id: number) => {
    try {
      await restoreStudent(id);

      alert("Student Restored Successfully");

      loadStudents();
    } catch (error) {
      console.error("Restore Error:", error);

      alert("Error while restoring student");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading students...
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* ========================= */}
      {/* ACTIVE STUDENTS */}
      {/* ========================= */}

      <h1 className="text-3xl font-bold mb-6">
        Student List
      </h1>

      <div className="mb-5">
        <Link
          href="/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="border p-2">ID</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Father Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="border p-4 text-center"
              >
                No active students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>

                <td className="border p-2">
                  {student.id}
                </td>

                <td className="border p-2">
                  {student.studentName}
                </td>

                <td className="border p-2">
                  {student.fatherName}
                </td>

                <td className="border p-2">
                  {student.address}
                </td>

                <td className="border p-2">
                  {student.gender}
                </td>

                <td className="border p-2">

                  <div className="flex gap-2">

                    {/* EDIT */}
                    <Link
                      href={`/students/edit/${student.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(student.id!)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>


      {/* ========================= */}
      {/* DELETED STUDENTS */}
      {/* ========================= */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-5">
          Deleted Students
        </h2>

        <table className="w-full border border-gray-300">

          <thead>
            <tr className="bg-gray-200 text-black">

              <th className="border p-2">
                ID
              </th>

              <th className="border p-2">
                Student Name
              </th>

              <th className="border p-2">
                Father Name
              </th>

              <th className="border p-2">
                Address
              </th>

              <th className="border p-2">
                Gender
              </th>

              <th className="border p-2">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {deletedStudents.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="border p-4 text-center"
                >
                  No deleted students
                </td>
              </tr>

            ) : (

              deletedStudents.map((student) => (

                <tr key={student.id}>

                  <td className="border p-2">
                    {student.id}
                  </td>

                  <td className="border p-2">
                    {student.studentName}
                  </td>

                  <td className="border p-2">
                    {student.fatherName}
                  </td>

                  <td className="border p-2">
                    {student.address}
                  </td>

                  <td className="border p-2">
                    {student.gender}
                  </td>

                  <td className="border p-2">

                    <button
                      onClick={() =>
                        handleRestore(student.id!)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Restore
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
