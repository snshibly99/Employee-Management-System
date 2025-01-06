import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const PerformanceForm = ({ addPerformance }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const data = {
      title: title,
      description: content,
    };

    try {
      const response = await axios.post(
        "http://localhost:9999/api/performance",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/performance");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit} // Use onSubmit for form submission
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        Create Performance Notes for Employees
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        placeholder="Type here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-blue-400"
        required
      ></textarea>
      <button
        type="submit" // Keep the type as submit
        className="bg-[#526D82] text-white px-4 py-2 rounded-md hover:bg-[#27374D]"
      >
        Post Notes
      </button>
    </form>
  );
};

export default PerformanceForm;