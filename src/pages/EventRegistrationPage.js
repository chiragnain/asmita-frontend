import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api"; // Your Axios instance or API configuration
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext for user data

const EventRegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {}; // Get event details passed from the EventList
  const { user } = useAuth(); // Get user info from AuthContext
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(
    Array(event?.teamSize).fill("")
  );

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to register."); // Check if user is logged in
      navigate("/login");
    }
  }, [user, navigate]);

  const handleIndividualRegister = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log("email=", user.email);
      await api.post(
        `/events/${event._id}/register/individual`,
        { email: user.email }, // Use user's email from AuthContext
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Registration successful!");
      navigate("/events"); // Redirect back to events list
    } catch (error) {
      alert("Registration failed: " + error.response.data.message);
    }
  };

  const handleTeamRegister = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      await api.post(
        `/events/${event._id}/register/team`,
        { teamName, members: teamMembers }, // Send the team name and emails of members
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Team registration successful!");
      navigate("/events"); // Redirect back to events list
    } catch (error) {
      alert("Registration failed: " + error.response.data.message);
    }
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  return (
    <div className=" mt-4 h-screen overflow-y-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        {event?.eventType === "team" ? "Team Registration" : "Registration"} for{" "}
        {event?.name}
      </h1>

      {event?.eventType === "individual" ? (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6 mt-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Register for Event
          </h2>
          <form onSubmit={handleIndividualRegister} className="text-center">
            <p className="mb-4 text-gray-700">
              <strong>Email:</strong>{" "}
              {user?.email || "User email not available"}
            </p>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white font-bold rounded bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-10">
          <form onSubmit={handleTeamRegister}>
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Members (Emails)
            </label>
            {teamMembers.map((member, index) => (
              <input
                key={index}
                type="email"
                placeholder={`Member ${index + 1} Email`}
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
                required
              />
            ))}

            <button
              type="submit"
              className="mt-6 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none"
            >
              Register Team
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationPage;
