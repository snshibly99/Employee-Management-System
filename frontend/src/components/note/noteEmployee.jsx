import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeNotes = ({ employeeId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [visibleToEmployee, setVisibleToEmployee] = useState(true);

 
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/employee/notes/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [employeeId]);

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

    if (!newNote) {
      alert("Please enter a note.");
      return;
    }

    try {
      const response = await axios.post(
        "/employee/notes",
        {
          employeeId,
          adminId: user._id, // Assuming admin is the user creating the note
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
        alert("Note added successfully");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#DDE6ED] p-8 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-6">Your Performance Notes</h3>
      <form onSubmit={handleSubmit}>
        {/* Add new note */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add a New Note
          </label>
          <textarea
            name="newNote"
            value={newNote}
            onChange={handleChange}
            placeholder="Enter your performance note"
            className="w-full border border-gray-300 p-2 mt-1 rounded-md"
            required
          ></textarea>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            name="visibleToEmployee"
            checked={visibleToEmployee}
            onChange={handleChange}
          />
          <label className="text-sm font-medium">Visible to Employee</label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#526D82] hover:bg-[#27374D] text-white font-bold py-2 px-4 rounded"
        >
          Add Note
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="mt-6">No notes available.</p>
      ) : (
        <ul className="mt-6">
          {notes.map((note) => (
            <li key={note._id} className="mb-4">
              <p>{note.note}</p>
              <small>Created At: {new Date(note.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeNotes;
