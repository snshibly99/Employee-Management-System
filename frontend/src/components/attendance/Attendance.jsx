import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState(null);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/auth/getUsers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setAttendance(response.data.users);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (!attendance) {
    return <div> Loadding </div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Attendance</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Seach By Name"
          className="px-4 py-0.5 border"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-800 uppercase bg-white border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Contact</th>
            <th className="px-6 py-3">Attendance</th>
            <th className="px-6 py-3">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b :bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{item.name}</td>
              <td className="px-6 py-3">{item.email}</td>
              <td className="px-6 py-3">{item.attendance}</td>
              <td className="px-6 py-3">{new Date(item.lastLoginDate).toLocaleString()}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
