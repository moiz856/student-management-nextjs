"use client";

import { useEffect, useState } from "react";
import {
  getDeletedStudents,
  restoreStudent
} from "@/services/studentService";


export default function TrashPage(){

const [students,setStudents]=useState<any[]>([]);


useEffect(()=>{
loadStudents();
},[]);


const loadStudents=async()=>{

const data = await getDeletedStudents();

setStudents(data);

};


const restore = async(id:number)=>{

await restoreStudent(id);

alert("Student Restored Successfully");

loadStudents();

};


return (

<div className="p-8">

<h1 className="text-3xl font-bold mb-5">
Deleted Students
</h1>


<table className="w-full border">

<thead>

<tr>
<th className="border p-2">
Name
</th>

<th className="border p-2">
Father Name
</th>

<th className="border p-2">
Action
</th>

</tr>

</thead>


<tbody>

{students.map((student)=>(

<tr key={student.id}>

<td className="border p-2">
{student.studentName}
</td>


<td className="border p-2">
{student.fatherName}
</td>


<td className="border p-2">

<button
onClick={()=>restore(student.id)}
className="bg-green-600 text-white px-3 py-1 rounded"
>
Restore
</button>

</td>

</tr>

))}


</tbody>


</table>

</div>

);

}
