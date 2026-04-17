const express = require("express");
const app = express();

let students = [
    { id: 1, name: "Santhiya", course: "CSE", age: 21 },
    { id: 2, name: "Vilei", course: "ECE", age: 20 },
    { id: 3, name: "Hari", course: "ECE", age: 20 },
    { id: 4, name: "Karan", course: "CSE", age: 22 },
    { id: 5, name: "Suthan", course: "CSE", age: 21 }
];

// Validate dataset
students.forEach(s => {
    if (!s.id || !s.name || !s.course || !s.age) {
        console.log("Invalid student data");
    }
});

app.get("/students", (req, res) => {
    console.log("GET /students");
    res.status(200).json(students);
});

app.get("/students/count", (req, res) => {
    res.status(200).json({ totalStudents: students.length });
});

app.get("/students/names", (req, res) => {
    res.status(200).json(students.map(s => s.name));
});

app.listen(3000);