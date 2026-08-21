"use client";

import { useRouter } from "next/navigation";
import StudentForm from "@/components/StudentForm";
import { createStudent } from "@/services/studentService";
import { Student } from "@/models/Student";

export default function NewStudentPage() {
  const router = useRouter();

  const saveStudent = async (student: Student) => {
    try {
      await createStudent(student);

      alert("Student Added Successfully");

      router.push("/students");
    } catch (error: any) {
  console.log(error.response?.data);
  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-5">
        Add Student
      </h1>

      <StudentForm onSubmit={saveStudent} />
    </div>
  );
}
