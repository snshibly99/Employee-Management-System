import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNotes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newNote, setNewNote] = useState("");
  const [visibleToEmployee, setVisibleToEmployee] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchNotes = async (employeeId) => {
    try {
      const response = await axios.get(`/notes/${employeeId}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newNote") {
      setNewNote(value);
    } else if (name === "visibleToEmployee") {
      setVisibleToEmployee(e.target.checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !newNote) {
      alert("Please select an employee and enter a note.");
      return;
    }

    try {
      const response = await axios.post(
        "/notes",
        {
          employeeId: selectedEmployee,
          adminId: user._id,
          note: newNote,
          visibleToEmployee,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setNotes([response.data.note, ...notes]);
        setNewNote("");
        setVisibleToEmployee(true);
        setSelectedEmployee("");
        alert("Note added successfully");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#DDE6ED] p-8 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-6">Admin: Manage Performance Notes</h3>
      <form onSubmit={handleSubmit}>
        {/* Employee Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Employee
          </label>
          <select
            name="selectedEmployee"
            value={selectedEmployee}
            onChange={(e) => {
              setSelectedEmployee(e.target.value);
              fetchNotes(e.target.value);
            }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Note Textarea */}
        {selectedEmployee && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add a performance note
              </label>
              <textarea
                name="newNote"
                value={newNote}
                onChange={handleChange}
                placeholder="Enter note"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md"
                required
              ></textarea>
            </div>

            {/* Visible to Employee Checkbox */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                name="visibleToEmployee"
                checked={visibleToEmployee}
                onChange={handleChange}
              />
              <label className="text-sm font-medium">Visible to Employee</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-[#526D82] hover:bg-[#27374D] text-white font-bold py-2 px-4 rounded"
            >
              Add Note
            </button>
          </>
        )}
      </form>

      {/* Notes List */}
      <ul className="mt-6">
        {notes.map((note) => (
          <li key={note._id} className="mb-4">
            <p>{note.note}</p>
            <small>Created At: {new Date(note.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotes;
