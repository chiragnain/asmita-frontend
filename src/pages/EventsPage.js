import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPerson, faPeopleGroup ,faCalendar, faMapLocationDot,faFlagCheckered, faUsersBetweenLines
  , faPeopleRoof, faUserTie,
  faSquareEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import api from '../api'; // Your Axios instance or API configuration
import {} from "@fortawesome/free-brands-svg-icons";
import Footer from '../components/Footer';

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events'); // Adjust the endpoint if necessary
        setEvents(response.data); // Assuming the data from backend is in the right format
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    navigate(`/eventRegister/${event._id}`, { state: { event } });
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className='flex flex-col justify-between h-screen overflow-y-auto'>
    <div className="container  mx-auto px-4 mb-6">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4 libre-baskerville-bold">All Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 ">No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="p-4 bg-white shadow rounded-lg">
              <div className='flex items-center justify-between bg-gray-100 px-2 py-1 rounded-md'>
                    <p className="text-xl font-extrabold">{event.name}</p>
                    {
                      event.eventType=='team'
                      ? <FontAwesomeIcon icon={faPeopleGroup} title='Team Event'/>
                      : <FontAwesomeIcon icon={faPerson}  title='Individual Event' />
                    }

              </div>

              <div className='flex justify-between mt-1 text-sm'>
                  <div className='flex items-center p-1'>
                    <FontAwesomeIcon icon={faMapLocationDot} title='Location'/>
                    <p  className='mx-2 px-2 bg-gray-100 rounded-md'>{event.location}</p>
                  </div>

                  <div className='flex items-center p-1'>
                    <FontAwesomeIcon icon={faCalendar} type='Date' />
                    <p className='mx-2 px-2 bg-gray-100 rounded-md'>{new Date(event.date).toLocaleDateString()}</p>
                  </div>

              </div>


              <div className='flex justify-between mt-1'>
                  
                    <div className='flex items-center p-1 '>
                      <FontAwesomeIcon icon={faUsersBetweenLines} title="Maximum Participants" />
                      <p  className='mx-2 px-2 bg-gray-100 rounded-md text-sm'> Max Limit: {event.maxParticipants}</p>
                    </div>


                    {event.eventType=='team'?
                      <div className='flex items-center p-1 '>
                          <FontAwesomeIcon icon={faPeopleRoof} title="Team Size" />
                          <p  className='mx-2 px-2 bg-gray-100 text-sm rounded-md'> Team Size : {event.teamSize}</p>
                      </div>
                      :""  
                    }
              </div>

              <div className='my-2'>
                <hr></hr>
              </div>

              <div className='flex items-center p-1 text-sm'>
                <FontAwesomeIcon icon={faUserTie} title="Organizer" />
                <p className='ml-2'>Organizer : </p>
                <p  className='mx-2 px-2 bg-gray-100 rounded-md'>{event.organizer?.full_name || "Unknown"}</p>
              </div>

              <div className='flex items-center p-1 text-sm'>
                <FontAwesomeIcon icon={faSquareEnvelope} title="Organizer Email" />
                <p className='ml-2'>Email : </p>
                <p  className='mx-2 px-2 bg-gray-100 rounded-md'>{event.organizer?.email || "N/A"}</p>
              </div>


              {/* Register Button */}
              <button
                onClick={() => handleRegister(event)}
                className="mt-4 w-full py-2 text-white font-bold rounded bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <Footer />

  </div>
  );
};

export default EventList;
