// src/pages/ViewAnnouncements.js
import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust according to your axios setup

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await api.get('/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto max-h-screen">
      <h2 className="text-3xl font-bold text-center mt-8 mb-4 libre-baskerville-bold">Announcements</h2>
    <div className='bg-white mt-2 mx-12 p-8 rounded-lg'> 
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="border flex flex-col p-4 mb-4 rounded">
            <h3 className="text-xl flex libre-baskerville-bold"> 
                <span className='flex m-2'>
                    <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                </span>
                {announcement.title}
            </h3>
            <p className='tinos-regular ml-2'>{announcement.content}</p>
          </div>
        ))
      ) : (
        <p>No announcements found.</p>
      )}
      </div>
    </div>
  );
};

export default ViewAnnouncements;
