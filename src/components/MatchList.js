import React, { useState, useEffect } from 'react';
import api from '../api'; // Adjust according to your axios setup

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/matches', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        setError('Failed to load matches');
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Matches</h1>
      {matches.length === 0 ? (
        <p>No matches scheduled yet.</p>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => (
            <div key={match._id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">{match.event.name}</h2>
              <p><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {match.time}</p>
              <p><strong>Duration:</strong> {match.duration} minutes</p>
              <p><strong>Venue:</strong> {match.venue}</p>
              {match.team1 && match.team2 ? (
                <p><strong>Teams:</strong> {match.team1} vs {match.team2}</p>
              ) : (
                <p><strong>Players:</strong> {match.player1} vs {match.player2}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;
