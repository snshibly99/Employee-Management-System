import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const PerformanceForm = ({ addPerformance }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page refresh)

    const data = {
      title: title,
      description: content,
    };

    try {
      const response = await axios.post(
        "http://localhost:9999/api/performances",
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
        Create Performance Summary
      </h2>
      <input
        type="text"
        placeholder="Employee Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        placeholder="Rating and suggestion"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-blue-400"
        required
      ></textarea>
      <button
        type="submit" 
        className="bg-[#526D82] text-white px-4 py-2 rounded-md hover:bg-[#27374D]"
      >
        Post Performance
      </button>
    </form>
  );
};

export default PerformanceForm;
