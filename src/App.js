// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'; 
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreateEvent from './pages/AdminPages/CreateEvent';
import UserList from './pages/AdminPages/UserList';
import EventPage from './pages/EventsPage';
import Sidebar from './components/Sidebar';
import { CalendarPlus, HomeIcon, SquareUser, LayoutDashboard, CalendarRange, NotebookIcon, Handshake, BookUser, CalendarPlus2, Volleyball, Globe, Rss } from 'lucide-react';
import { SidebarItem } from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext'; // Ensure both are imported
import ConfirmEmail from './pages/ConfirmEmail';
import EventRegistrationPage from './pages/EventRegistrationPage';
import Contacts from './pages/Contacts';
import Sponsors from './pages/Sponsors';
import EventParticipants from './pages/AdminPages/EventParticipants';
import CreateAnnouncements from './pages/AdminPages/CreateAnnouncements';
import ScheduleMatch from './pages/AdminPages/ScheduleMatch';
import MatchList from './components/MatchList';
import Announcement from './pages/Announcement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

function Main() {
  const { user } = useAuth(); // Get user from AuthContext
  const isAdminOrOrganizer = user && (user.role === 'admin' || user.role === 'organizer');

  return (
    <div className="app">
      <Sidebar className="w-64 h-screen fixed bg-gray-100 p-4"> 
        <SidebarItem to="/" icon={<HomeIcon size={20}/>} text="Home" />
        <SidebarItem to="/Dashboard" icon={<LayoutDashboard size={20}/>} text="Dashboard" />
        <SidebarItem to="/events" icon={<CalendarRange size={20}/>} text="Events" />
        <SidebarItem to="/announcements" icon={<Rss size={20}/>} text="Announcements" />
        <SidebarItem to="/contacts" icon={<NotebookIcon size={20}/>} text="Contacts" />
        <SidebarItem to="/sponsors" icon={<Handshake size={20}/>} text="Sponsors" />

        <hr className='my-3'/>
        {isAdminOrOrganizer && (
          <>
            <SidebarItem to="/CreateEvent" icon={<CalendarPlus size={20}/>} text="Create Event" />
            <SidebarItem to="/users" icon={<SquareUser size={20}/>} text="All Users" />
            <SidebarItem to="/EventParticipants" icon={<BookUser size={20}/>} text="Participants" />
            <SidebarItem to="/scheduleMatch" icon={<CalendarPlus2 size={20}/>} text="Schedule Match" />
            <SidebarItem to="/matches" icon={<Volleyball size={20}/>} text="All Matches" />
            <SidebarItem to="/CreateAnnouncements" icon={<Rss size={20}/>} text="Push Announcements" />
          </>
        )}
      </Sidebar>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
          <Route path="/eventRegister/:eventId" element={<EventRegistrationPage />} />
          <Route path='/announcements' element={<Announcement/>} />

          {/* admin only routes */}
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/EventParticipants" element={<EventParticipants/>} />
          <Route path='/scheduleMatch' element={<ScheduleMatch/>} />
          <Route path='/matches' element={<MatchList/>} />
          <Route path='/CreateAnnouncements' element={<CreateAnnouncements/>} />



        </Routes>
      </div>
    </div>
  );
}

export default App;
