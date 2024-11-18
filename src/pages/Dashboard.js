import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import Footer from '../components/Footer'; // Import your Footer component
import LiveMatches from '../components/LiveMatches';
import UpcomingMatches from '../components/UpcomingMatches';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto max-h-screen">
      {/* Header Section */}
        <h2 className="text-3xl font-bold text-center mt-8 mb-4 libre-baskerville-bold">Dashboard</h2>

      <div className='flex justify-around'>
        <LiveMatches/>
        <UpcomingMatches/>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
