import React, { useState, useEffect } from 'react';
import api from '../../api'; // Adjust according to your axios setup

const ScheduleMatch = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [duration, setDuration] = useState(''); // Added duration state
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isTeamEvent, setIsTeamEvent] = useState(false);

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

  const handleEventSelect = async (eventId) => {
    setSelectedEvent(eventId);
    const token = localStorage.getItem('token');
    try {
      const response = await api.get(`/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data.teams) {
        setTeams(data.teams);
        setIsTeamEvent(true);
      } else {
        setParticipants(data.participants);
        setIsTeamEvent(false);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleScheduleMatch = async (e) => {
    e.preventDefault();
    const matchData = {
      event: selectedEvent,
      date,
      time,
      venue,
      duration, // Added duration to match data
      team1: isTeamEvent ? team1 : player1,
      team2: isTeamEvent ? team2 : player2,
    };

    try {
      const token = localStorage.getItem('token');
      await api.post('/matches/schedule', matchData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Match scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling match:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Schedule Match</h1>
        <form onSubmit={handleScheduleMatch}>
          <label htmlFor="eventSelect" className="block mb-2">Select Event:</label>
          <select 
            id="eventSelect" 
            onChange={(e) => handleEventSelect(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>{event.name}</option>
            ))}
          </select>

          {isTeamEvent ? (
            <>
              <label htmlFor="team1Select" className="block mb-2">Select Team 1:</label>
              <select 
                id="team1Select" 
                onChange={(e) => setTeam1(e.target.value)} 
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team.teamName}>{team.teamName}</option>
                ))}
              </select>

              <label htmlFor="team2Select" className="block mb-2">Select Team 2:</label>
              <select 
                id="team2Select" 
                onChange={(e) => setTeam2(e.target.value)} 
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team.teamName}>{team.teamName}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label htmlFor="player1Select" className="block mb-2">Select Player 1:</label>
              <select 
                id="player1Select" 
                onChange={(e) => setPlayer1(e.target.value)} 
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Player</option>
                {participants.map((participant) => (
                  <option key={participant.email} value={participant.email}>{participant.email}</option>
                ))}
              </select>

              <label htmlFor="player2Select" className="block mb-2">Select Player 2:</label>
              <select 
                id="player2Select" 
                onChange={(e) => setPlayer2(e.target.value)} 
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Player</option>
                {participants.map((participant) => (
                  <option key={participant.email} value={participant.email}>{participant.email}</option>
                ))}
              </select>
            </>
          )}
        <div className='flex justify-between'>

        <div>
          <label htmlFor="date" className="block mb-2">Match Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded w-full" 
            required 
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-2">Match Time:</label>
          <input 
            type="time" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded w-full" 
            required 
          />
        </div>

        
        </div>

        <div className='flex justify-between'> 
        <div> 
          <label htmlFor="duration" className="block mb-2">Duration (minutes):</label>
          <input 
            type="number" 
            id="duration" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded w-full" 
            required 
          />
        </div>
         <div> 
          <label htmlFor="venue" className="block mb-2">Venue:</label>
          <input 
            type="text" 
            id="venue" 
            value={venue} 
            onChange={(e) => setVenue(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded w-full" 
            required 
          />
          </div>
        </div>
          <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700 transition duration-200">Schedule Match</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMatch;
