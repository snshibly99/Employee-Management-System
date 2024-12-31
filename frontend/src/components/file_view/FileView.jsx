import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const FileView = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:9999/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.files.map((file) => ({
            _id: file._id,
            sno: sno++,
            name: file.name,
            view: <button className="px-4 py-1 bg-blue-500 text-white rounded">View</button>,
          }));

          setFiles(data);
          setFilteredFiles(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleFilter = (e) => {
    const records = files.filter((file) =>
      file.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredFiles(records);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!filteredFiles) {
    return <div>No files available</div>;
  }

  const columns = [
    {
      name: 'S No',
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => row.view,
    },
  ];

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Files</h3>
      </div>
      <div className="flex justify-between items-center mt-6">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/upload-file"
          className="px-4 py-1 bg-[#27374D] rounded text-white"
        >
          Upload New File
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredFiles} pagination />
      </div>
    </div>
  );
};

export default FileView;
