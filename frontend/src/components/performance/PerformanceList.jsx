import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FaUserCircle } from "react-icons/fa";


const PerformanceList = () => {
    const { user } = useAuth();
    const [performances, setPerformances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  
    useEffect(() => {
      const fetchPerformances = async () => {
        try {
          const response = await axios.get("http://localhost:9999/api/performance", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setPerformances(response.data.performances);
        } catch (error) {
          console.error("Failed to fetch performances", error);
        }
      };
  
      fetchPerformances();
    }, []);
  
    // Pagination logic
    const totalPerformances = performances.length;
    const indexOfLastPerformance = currentPage * rowsPerPage;
    const indexOfFirstPerformance = indexOfLastPerformance - rowsPerPage;
    const currentPerformances = performances.slice(indexOfFirstPerformance, indexOfLastPerformance);
  
    const totalPages = Math.ceil(totalPerformances / rowsPerPage);
  
    const handleRowsPerPageChange = (e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1); // Reset to the first page
    };
  
    return (
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">Performance Notes</h3>
        </div>
        {user.role === "admin" && (
          <div className="flex justify-end mb-4">
            <Link
              to="/admin-dashboard/add-performance"
              className="px-4 py-2 bg-[#27374D] rounded text-white"
            >
              Post Performance
            </Link>
          </div>
        )}
  
        <div className="flex flex-col gap-6">
          {currentPerformances.map((performance) => (
            <div
              key={performance.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-gray-500 text-3xl" />
                <div>
                  <h2 className="font-semibold text-lg">{performance.createdBy.name}</h2>
                  <span className="text-gray-500 text-sm">
                    {new Date(performance.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">{performance.title}</h1>
                <p className="text-gray-700">{performance.description}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6 p-4 border-t">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border px-2 py-1 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
  
          {/* Page range display */}
          <div>
            {`${indexOfFirstPerformance + 1}-${Math.min(indexOfLastPerformance, totalPerformances)} of ${totalPerformances}`}
          </div>
  
          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 ${currentPage === 1 ? "text-gray-400" : "text-blue-500"}`}
            >
              {"|<"}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 ${currentPage === 1 ? "text-gray-400" : "text-blue-500"}`}
            >
              {"<"}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 ${currentPage === totalPages ? "text-gray-400" : "text-blue-500"}`}
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 ${currentPage === totalPages ? "text-gray-400" : "text-blue-500"}`}
            >
              {">|"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PerformanceList;