import React, { useState, useEffect } from 'react';
import api from '../api';
import vs from '../assets/vs.png';
import upcoming from '../assets/upcoming.png';
import flag from '../assets/flag.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faClock, faMapPin ,faRabbit} from "@fortawesome/free-solid-svg-icons";

const UpcomingMatches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const response = await api.get('/matches');
        const currentTime = new Date();
        const eightHourLater = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000);

        const upcoming = response.data.filter((match) => {
          const matchDateTime = new Date(`${match.date.substring(0, 10)}T${match.time}:00`);
          return matchDateTime > currentTime && matchDateTime <= eightHourLater;
        });

        setUpcomingMatches(upcoming);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      }
    };

    fetchUpcomingMatches();
  }, []);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 m-4 min-h-[380px] max-h-[380px] min-w-[500px]">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <img src={upcoming} className='w-6 h-6 mx-2'/>
        Later in the Day !!
      </h2>

      <div className='overflow-y-auto px-2 scrollbar-hide-hover'>
        {upcomingMatches.length > 0 ? (
          upcomingMatches.map((match, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-200 shadow-md shadow-blue-200 rounded-lg">
              <span className='flex'> 
                <img src={flag} className='w-5 h-5 mr-2' alt="Event flag" />
                <p className='pb-2 font-extrabold uppercase libre-baskerville-bold'>{match.event.name}</p>
              </span>
              <p className='flex justify-center'>
                <span className='bg-red-50 shadow-md border border-red-500 p-1 rounded-lg text-sm'>{match.team1 || match.player1}</span> 
                <img src={vs} className='w-8 h-8 mx-1' alt="vs icon" /> 
                <span className='bg-blue-50 shadow-md border border-blue-500 p-1 rounded-lg text-sm'>{match.team2 || match.player2}</span>
              </p>
              <p className='flex justify-between w-full mt-2'> 
                <p>
                  <FontAwesomeIcon icon={faMapPin} title='Venue' />
                  <span className='mx-1 border border-gray-100 rounded-md p-1 bg-gray-100'>{match.venue}</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} title='Time' />
                  <span className='mx-1 border border-gray-100 rounded-md p-1 bg-gray-100'>{match.time}</span>
                </p>
              </p>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center my-20'> 
            <FontAwesomeIcon icon={faBoxOpen} title='Venue' size="2x" style={{ color: 'gray' }} />
          <p className='font-bold text-gray-500 mx-2 my-auto my-4'>No upcoming matches in next 8 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMatches;
