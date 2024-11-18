import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import Auth context
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const { login } = useAuth();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null); // State to hold error messages
   const [loading, setLoading] = useState(false); // State to manage loading status
   const navigate = useNavigate();

   useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token)navigate('/');
   })

   const handleLogin = async (e) => {
      e.preventDefault();
      setError(null); // Reset error state on new login attempt
      setLoading(true); // Set loading to true

      try {
         // Attempt to login with the provided email and password
         await login({ email, password });
         navigate('/'); // Redirect to dashboard on successful login
      } catch (err) {
         const errorMessage = err.response?.data?.message;
      if (errorMessage === 'Invalid credentials') {
         setError('Invalid credentials. Please try again.'); // Display specific error
      } else {
         setError(errorMessage || 'Something went wrong. Please contact admin'); // Display generic error
      }
      } finally {
         setLoading(false); // Reset loading regardless of the outcome
      }
   };

   return (
      <div className="bg-gray-200 flex justify-center items-center h-screen">
         <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
            <h1 className="font-bold text-center block text-2xl">Log In</h1>
            <form onSubmit={handleLogin}>
               <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     placeholder="example@iiita.ac.in" 
                     value={email} // Pass the current state as the value
                     onChange={(e) => setEmail(e.target.value)} // Directly update the state
                     className="mt-1 p-2 border border-gray-300 rounded w-full" // Add basic styling
                     required // Make the input required
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                     type="password" 
                     id="password" 
                     name="password" 
                     placeholder="••••••••••" 
                     value={password} // Pass the current state as the value
                     onChange={(e) => setPassword(e.target.value)} // Directly update the state
                     className="mt-1 p-2 border border-gray-300 rounded w-full" // Add basic styling
                     required // Make the input required
                  />
               </div>
               {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
               <button 
                  type="submit" // Ensure this is a submit button
                  className={`mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer 
                     bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 
                     focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading} // Disable button while loading
               >
                  {loading ? "Logging in..." : "Login"}
               </button>
            </form>
            <div className='mt-3 flex justify-center'>
               <p className='justify-center'>Don't have an account?  
                  <a href="/register" className="ml-2 text-indigo-600 hover:underline">
                      Register
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
