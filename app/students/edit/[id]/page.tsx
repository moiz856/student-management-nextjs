"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentForm from "@/components/StudentForm";
import { Student } from "@/models/Student";
import { getStudent, updateStudent } from "@/services/studentService";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const data = await getStudent(Number(params.id));
    setStudent(data);
  };

  const saveStudent = async (data: Student) => {
    await updateStudent(Number(params.id), data);
    alert("Student Updated Successfully");
    router.push("/students");
  };

  if (!student) return <h2>Loading...</h2>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-5">
        Edit Student
      </h1>

      <StudentForm
        student={student}
        onSubmit={saveStudent}
      />
    </div>
  );
}
