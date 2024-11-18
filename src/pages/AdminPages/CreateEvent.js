import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const CreateEvent = () => {
   const { user } = useAuth();
   const navigate = useNavigate();

   const [organizers, setOrganizers] = useState([]);
   const [formData, setFormData] = useState({
      name: '',
      description: '',
      date: '',
      location: '',
      sportType: '',
      maxParticipants: 10,
      organizer: '', 
      eventType: 'individual', // Default to 'individual'
      teamSize: '', // Only needed if eventType is 'team'
   });
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      // Fetch list of organizers
      const fetchOrganizers = async () => {
         try {
            const token = localStorage.getItem('token');
            const response = await api.get('/users/organizers',{
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             });
            setOrganizers(response.data);
         } catch (error) {
            console.error('Error fetching organizers:', error);
         }
      };
      fetchOrganizers();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
         const token = localStorage.getItem('token');
         await api.post('/events', { ...formData },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         navigate('/events');
      } catch (err) {
         setError('Failed to create event. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-center items-center mt-8 bg-gray-100">
         <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Event</h1>
            <form onSubmit={handleSubmit}>
               <div className="flex justify-between">
                  <div>
                     <label htmlFor="name" className="text-sm font-medium text-gray-700">Event Name</label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Type Event Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     />
                  </div>
                  <div>
                     <label htmlFor="organizer" className="text-sm font-medium text-gray-700">Organizer</label>
                     <select
                        id="organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     >
                        <option value="">Select Organizer</option>
                        {organizers.map((organizer) => (
                           <option key={organizer._id} value={organizer._id}>
                              {organizer.full_name}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <div className="mb-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                     id="description"
                     name="description"
                     placeholder="Add Description..."
                     value={formData.description}
                     onChange={handleChange}
                     className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
               </div>
               <div className="flex justify-between ">
                  <div className=' pb-2'>
                     <label htmlFor="eventType" className="text-sm font-medium text-gray-700">Event Type</label>
                     <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="mt-1 p-1 border border-gray-300 rounded w-full"
                        required
                     >
                        <option value="individual">Individual</option>
                        <option value="team">Team</option>
                     </select>
                  </div>
                  {formData.eventType === 'team' && (
                           <div className=' '>
                              <label htmlFor="teamSize" className="text-sm font-medium text-gray-700">Team Size</label>
                              <input
                                 type="number"
                                 id="teamSize"
                                 name="teamSize"
                                 placeholder="Team Size"
                                 value={formData.teamSize}
                                 onChange={handleChange}
                                 className="mt-1 p-1 border border-gray-300 rounded w-full"
                                 required={formData.eventType === 'team'}
                                 min="1"
                              />
                           </div>
                        )}
               </div>

               <div className="flex justify-between">
                  <div>
                     <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                     <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     />
                  </div>
                  <div>
                     <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                     <input
                        type="text"
                        id="location"
                        placeholder="Type a location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     />
                  </div>
               </div>
               <div className="flex justify-between">
                  <div className="mb-4">
                     <label htmlFor="sportType" className="text-sm font-medium text-gray-700">Sport Type</label>
                     <input
                        type="text"
                        id="sportType"
                        name="sportType"
                        placeholder="Give a Sports Type"
                        value={formData.sportType}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="maxParticipants" className="text-sm font-medium text-gray-700">Max Participants</label>
                     <input
                        type="number"
                        id="maxParticipants"
                        name="maxParticipants"
                        placeholder="Max Participants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                     />
                  </div>
               </div>
               {error && <p className="text-red-500">{error}</p>}
               <button
                  type="submit"
                  className={`mt-6 w-full py-3 text-white font-bold rounded bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${
                     loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
               >
                  {loading ? 'Creating Event...' : 'Create Event'}
               </button>
            </form>
         </div>
      </div>
   );
};

export default CreateEvent;
