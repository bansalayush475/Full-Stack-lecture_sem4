import React from "react";
import "./app.css";

function StudentTable() {

const students = [
{
id:1,
name:"Ayush Bansal",
rollNo:"101",
course:"CSE",
semester:"4th"
},

{
id:2,
name:"Rohan Sharma",
rollNo:"102",
course:"CSE",
semester:"4th"
},

{
id:3,
name:"Priya Verma",
rollNo:"103",
course:"IT",
semester:"4th"
},

{
id:4,
name:"Ankit Gupta",
rollNo:"104",
course:"ECE",
semester:"4th"
}
];

return (
<div className="container">
<h1>Student Data Table</h1>

<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Roll No</th>
<th>Course</th>
<th>Semester</th>
</tr>
</thead>

<tbody>
{
students.map((student)=>(
<tr key={student.id}>
<td>{student.id}</td>
<td>{student.name}</td>
<td>{student.rollNo}</td>
<td>{student.course}</td>
<td>{student.semester}</td>
</tr>
))
}
</tbody>

</table>
</div>
);
}

export default StudentTable;