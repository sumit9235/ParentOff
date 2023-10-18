import React, { useState } from 'react';

function StudentForm() {
  const [studentData, setStudentData] = useState({
    name: '',
    std: '',
    marks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4500/studentData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData),
        });
  
        if (response.ok) {
          console.log('Data saved successfully');
        } else {
          console.error('Error saving data:', response.statusText);
        }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <div>
      <h2>Student Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="std">Standard:</label>
          <input
            type="text"
            id="std"
            name="std"
            value={studentData.std}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            type="text"
            id="marks"
            name="marks"
            value={studentData.marks}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;