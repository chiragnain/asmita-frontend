import React, { useState, useEffect } from 'react';
import api from '../api';
import vs from '../assets/vs.png';
import flag from '../assets/flag.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faClock, faMapPin ,faRabbit} from "@fortawesome/free-solid-svg-icons";

const LiveMatches = () => {
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await api.get('/matches');
        const currentTime = new Date();

        const live = response.data.filter((match) => {
          const matchStartTime = new Date(`${match.date.substring(0, 10)}T${match.time}:00`);
          const matchEndTime = new Date(matchStartTime.getTime() + match.duration * 60000);
          return currentTime >= matchStartTime && currentTime <= matchEndTime;
        });

        setLiveMatches(live);
      } catch (error) {
        console.error('Error fetching live matches:', error);
      }
    };

    fetchLiveMatches();
  }, []);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 m-4 min-h-[380px] max-h-[380px] min-w-[500px]" >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {liveMatches.length > 0 && (
          <span className='flex m-2'>
                    <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
          </span>
        )}
        Live Matches
      </h2>

      <div className=' overflow-y-auto px-2 scrollbar-hide-hover'>
            {liveMatches.length > 0 ? (
                liveMatches.map((match, index) => (
                <div key={index} className=" p-4 mb-4 border border-gray-200 shadow-md shadow-blue-200 rounded-lg">
                    <span className='flex'> 
                        <img src={flag} className='w-5 h-5 mr-2' />
                        <p className='pb-2 font-extrabold uppercase libre-baskerville-bold'>{match.event.name}</p>
                    </span>
                    <p className='flex justify-center'>
                       <span className='bg-red-50 shadow-md border border-red-500 p-1 rounded-lg text-sm '>{match.team1 || match.player1} </span> 
                        <img src={vs} className='w-8 h-8 ' /> 
                        <span className='bg-blue-50 shadow-md border border-blue-500 p-1 rounded-lg text-sm '> {match.team2 || match.player2}</span> 
                    </p>
                    <p className='flex  justify-between w-full mt-2'> 
                        <p><FontAwesomeIcon icon={faMapPin} title='Venue'/><span className='mx-1 text-sm border border-gray-100 rounded-md p-1 bg-gray-100'> {match.venue} </span> </p>
                        <p><FontAwesomeIcon icon={faClock} title='Time'/> <span className='mx-1 text-sm border border-gray-100 rounded-md p-1 bg-gray-100'>{match.time}</span></p>
                    </p>
                </div>
                ))
            ) : (
              <div className='flex flex-col items-center my-20'> 
              <FontAwesomeIcon icon={faBoxOpen} title='Venue' size="2x" style={{ color: 'gray' }} />
            <p className='font-bold text-gray-500 mx-2 my-auto my-4'>No live matches currently.</p>
            </div>
            )}
      </div>
      
    </div>
  );
};

export default LiveMatches;
