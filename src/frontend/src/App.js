import "./App.css";
import { getAllStudents } from "./client";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = () =>
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      });

  // initial run
  useEffect(() => {
    console.log("Component mounted");
    console.log("run fetchStudents");
    fetchStudents();
  }, []);

  return students.map((student, index) => (
    <p key={index}>
      {student.id} {student.name}
    </p>
  ));
}

export default App;
