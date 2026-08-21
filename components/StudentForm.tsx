"use client";

import { useEffect, useState } from "react";
import { Student } from "@/models/Student";

interface Props {
  student?: Student;
  onSubmit: (student: Student) => void;
}

export default function StudentForm({ student, onSubmit }: Props) {
  const [formData, setFormData] = useState<Student>({
    id: 0,
    studentName: "",
    fatherName: "",
    address: "",
    gender: "Male",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="studentName"
        value={formData.studentName}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button
        type="button"
        onClick={() => {
          console.log("Sending:", formData); // Debug
          onSubmit(formData);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Student
      </button>
    </div>
  );
}
