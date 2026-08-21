import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Student Management System
      </h1>

      <p className="text-gray-600 mb-6">
        Manage your students easily
      </p>

      <div className="flex gap-4">
        <Link
          href="/students"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          View Students
        </Link>

        <Link
          href="/new"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Add Student
        </Link>
      </div>
    </div>
  );
}
