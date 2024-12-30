import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FaUserCircle } from "react-icons/fa";



const AnnouncementList = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/announcements", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAnnouncements(response.data.announcements.reverse());
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Pagination logic
  const totalAnnouncements = announcements.length;
  const indexOfLastAnnouncement = currentPage * rowsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - rowsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const totalPages = Math.ceil(totalAnnouncements / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Announcements</h3>
      </div>
      {user.role === "admin" && (
        <div className="flex justify-end mb-4">
          <Link
            to="/admin-dashboard/add-announcement"
            className="bg-[#526D82] text-white px-4 py-2 rounded-md hover:bg-[#27374D]"
          >
            Post Announcement
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {currentAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-gray-500 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg">{announcement.createdBy.name}</h2>
                <span className="text-gray-500 text-sm">
                  {new Date(announcement.createdAt).toLocaleString("en-US", {
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
              <h1 className="text-xl font-bold">{announcement.title}</h1>
              <p className="text-gray-700">{announcement.description}</p>
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
          {`${indexOfFirstAnnouncement + 1}-${Math.min(indexOfLastAnnouncement, totalAnnouncements)} of ${totalAnnouncements}`}
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

export default AnnouncementList;
