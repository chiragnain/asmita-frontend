// src/pages/AdminPages/CreateAnnouncements.js
import React, { useEffect, useState } from 'react';
import api from '../../api'; // Adjust according to your axios setup

const CreateAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem('token');
      const response = await api.post('/announcements', { title, content },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnnouncements([...announcements, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
        const token=localStorage.getItem('token');
      await api.delete(`/announcements/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnnouncements(announcements.filter(announcement => announcement._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 mx-auto">Create Announcements</h2>
      <div className='border border-black rounded-xl shadow-xl p-8 flex flex-col max-w-[500px] mx-auto mb-8'> 
          <form onSubmit={handleCreateAnnouncement} className="mb-4 flex flex-col">
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mr-2"
              required
            />
            <textarea
              placeholder="Announcement Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 mr-2"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Create Announcement</button>
          </form>
      </div>

      <div className='bg-white mt-2 mx-12 p-8 rounded-lg'> 
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="border flex flex-col p-4 mb-4 rounded">
            <h3 className="text-xl flex libre-baskerville-bold"> 
                {announcement.title}
            </h3>
            <p className='tinos-regular '>{announcement.content}</p>
            <button
              onClick={() => handleDeleteAnnouncement(announcement._id)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 mt-2 max-w-[60px]"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No announcements found.</p>
      )}
      </div>
    </div>
  );
};

export default CreateAnnouncements;


