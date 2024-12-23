// const AnnouncementList = ({ announcements, addComment, isAdmin }) => {
//     return (
//       <div className="space-y-4">
//         {announcements.map((announcement) => (
//           <div
//             key={announcement._id}
//             className="bg-white p-6 rounded-lg shadow-md"
//           >
//             <h3 className="text-lg font-bold text-gray-800">{announcement.title}</h3>
//             <p className="text-gray-700">{announcement.content}</p>
//             <p className="text-sm text-gray-500">
//               Posted At: {new Date(announcement.createdAt).toLocaleString()}
//             </p>
//             {!isAdmin && (
//               <CommentSection
//                 announcementId={announcement._id}
//                 comments={announcement.comments}
//                 addComment={addComment}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };
  


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const AnnouncementList = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);

  console.log(user)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/announcements',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response)
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return <div className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Announcement</h3>
        </div>
        <div className="flex justify-between items-center">
          {user.role === "admin" && (
            <Link
              to="/admin-dashboard/add-announcement"
              className="px-4 py-1 bg-[#27374D] rounded text-white"
            >
              Post Announcement
            </Link>
          )}
        </div>

        <div className='flex flex-col gap-4'>
          {announcements?.reverse().map((announcement) => (
            <div className='bg-gray-300 p-6'>
              <span className='text-red-500'>{announcements[0]===announcement?"Latest":""}</span>
              <h1 className='text-2xl'>{announcement?.title}</h1>
              <h1 className='text-lg'>{announcement?.createdBy.name}</h1>
              <p>{announcement?.description}</p>
            </div>
          )

          )}
        </div>
      </div>
};

export default AnnouncementList

