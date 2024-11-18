import React, { useState, useEffect } from 'react';
import api from '../../api';

const EventParticipants = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(localStorage.getItem('selectedEvent') || '');
  const [participants, setParticipants] = useState(
    JSON.parse(localStorage.getItem('participants')) || []
  );
  const [isTeamEvent, setIsTeamEvent] = useState(localStorage.getItem('isTeamEvent') === 'true');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      handleEventSelect(selectedEvent);
    }
  }, [selectedEvent]);

  const handleEventSelect = async (eventId) => {
    try {
      setSelectedEvent(eventId);
      localStorage.setItem('selectedEvent', eventId);

      const token = localStorage.getItem('token');
      const response = await api.get(`/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      if (data.teams) {
        setParticipants(data.teams);
        setIsTeamEvent(true);
        localStorage.setItem('participants', JSON.stringify(data.teams));
        localStorage.setItem('isTeamEvent', 'true');
      } else {
        setParticipants(data.participants);
        setIsTeamEvent(false);
        localStorage.setItem('participants', JSON.stringify(data.participants));
        localStorage.setItem('isTeamEvent', 'false');
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  return (
    <div className='h-screen overflow-y-auto'> 
      <div className="mt-8 p-4 bg-white flex-col rounded-md mx-8">
        <h1 className="text-2xl font-bold mb-4 text-center libre-baskerville-bold">Event Participants</h1>

        {/* Event selection dropdown */}
        <label htmlFor="eventSelect" className="text-sm font-bold text-gray-700 mr-4">
          Select Event:
        </label>
        <select
          id="eventSelect"
          value={selectedEvent}
          onChange={(e) => handleEventSelect(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>

        {/* Display participants or teams */}
        <div className="mt-6">
          {isTeamEvent ? (
            participants.map((team, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded mb-2">
                <p><span className='tinos-bold'>Team Name :</span> <span className='font-bold bg-gray-200 rounded-md p-1'>{team.teamName}</span></p>
                <ul className='my-2'>
                  {team.members.map((member, i) => (
                    <li key={i} className='my-1'><span className='tinos-regular'> Member Email: </span> <span className='bg-gray-200 rounded-md p-1'>{member.email}</span></li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            participants.map((participant, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded mb-2">
                <p><span className='tinos-regular'>Participant Email:</span> <span className='bg-gray-200 rounded-md p-1'>{participant.email} </span></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventParticipants;
