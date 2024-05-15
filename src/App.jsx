import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [mentorName, setMentorName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateMentor = async () => {
    try {
      const response = await axios.post('https://day-39-backend-04op.onrender.com/mentors', { name: mentorName });
      if (response && response.data && response.data._id) {
        setMessage(`Mentor created with ID: ${response.data._id}`);
      } else {
        setMessage('Error creating mentor: Invalid response format');
      }
    } catch (error) {
      setMessage(`Error creating mentor: ${error.response.data.error}`);
    }
  };



  const handleCreateStudent = async () => {
    try {
      const response = await axios.post('https://day-39-backend-04op.onrender.com/students', { name: studentName, mentorId });
      setMessage(`Student created with ID: ${response.data._id}`);
    } catch (error) {
      setMessage(`Error creating student: ${error.response.data.error}`);
    }
  };

  const handleAssignStudentToMentor = async () => {
    try {
      await axios.post(`https://day-39-backend-04op.onrender.com/mentors/${mentorId}/students`, { studentId });
      setMessage('Student assigned to mentor successfully');
    } catch (error) {
      setMessage(`Error assigning student to mentor: ${error.response.data.error}`);
    }
  };

  const handleSetStudentMentor = async () => {
    try {
      await axios.put(`https://day-39-backend-04op.onrender.com/students/${studentId}/mentor`, { mentorId });
      setMessage('Mentor assigned to student successfully');
    } catch (error) {
      setMessage(`Error setting mentor for student: ${error.response.data.error}`);
    }
  };

  return (
    <div className='container'>
      <h1 className='heading'>Frontend</h1>
      <div className='box1'>
        <input type="text" placeholder="Mentor Name" value={mentorName} onChange={(e) => setMentorName(e.target.value)} />
        <button onClick={handleCreateMentor}>Create Mentor</button>
      </div>
      <br></br>
      <div className='box2'>
        <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleCreateStudent}>Create Student</button>
      </div>   <br></br>
      <div>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleAssignStudentToMentor}>Assign Student to Mentor</button>
      </div>   <br></br>
      <div className='box4'>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleSetStudentMentor}>Set Mentor for Student</button>
      </div>   <br></br>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;